import {Component, OnInit} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {webSocket} from "rxjs/webSocket";

@Component({
  selector: 'app-cna-socket',
  templateUrl: './cna-socket.component.html',
  styleUrls: ['./cna-socket.component.css']
})
export class CnaSocketComponent implements OnInit {

  caseId = '100005';
  private serverUrl = 'http://172.168.1.176:8080/cna/websocket-casenarrative';
  private stompClient;
  private cases = [];
  private socket: WebSocket;
  private subject: any;

  constructor() {
  }

  static onError(event) {
    console.log('error in websocket');
    console.log(event);
  }

  static onClose() {
    console.log('complete and closing');
  }

  ngOnInit() {
    this.subject = webSocket('ws://172.168.1.176:8080/cna/socket');
    this.subject.subscribe(
      msg => this.showGreeting(msg), // Called whenever there is a message from the server.
      err => CnaSocketComponent.onError(err), // Called if at any point WebSocket API signals some kind of error.
      () => CnaSocketComponent.onClose() // Called when connection is closed (for whatever reason).
    );
  }

  showGreeting(body: any) {
    let data;
    if (body != undefined) {
      // data = JSON.parse(body);
      data = JSON.stringify(body);
    }
    this.cases.push(data);
  }

  connect = function () {
    var self = this;
    let header = {
      queueId: Math.random().toString(36).substring(7),
      caseId: self.caseId,
      // caseId: "2018_013145",
      caseNarrative: true
    };
    let sockJsProtocols = ["xhr-streaming", "xhr-polling"];
    let socket = new SockJS(self.serverUrl, null, {transport: sockJsProtocols});

    self.stompClient = Stomp.over(socket);

    self.stompClient.connect(header, function (frame) {
      // setConnected(true);

      console.log('Connected: ' + frame);
      self.stompClient.subscribe('/queue/' + header.queueId, function (greeting) {
        self.showGreeting(greeting.body);
      });
    });
  };

  webconnect() {
    let header = {
      case_id: this.caseId,
      case_narrative: true
    };
    let self = this;
    self.close();
    // this.socket = new WebSocket('ws://172.168.1.176:6777/socket');
    this.socket = new WebSocket('ws://172.168.1.176:8080/cna/socket');
    // this.socket = new WebSocket('ws://172.168.1.159:8084/socket');

    this.socket.onopen = function (event) {
      console.log(event);
      self.socket.send(JSON.stringify(header));
    };

    this.socket.onmessage = function (ev) {
      self.showGreeting(ev.data);
    };

    this.socket.onclose = function (event) {
      console.log('received error');
    };

    this.socket.onerror = function (event) {
      CnaSocketComponent.onError(event);
    }
  }

  webconnect_rx() {
    let header = {
      case_id: this.caseId,
      case_narrative: true
    };
    this.subject.next(header);
  };

  close() {
    let self = this;
    this.cases = [];
    if (self.socket != undefined || self.socket != null) {
      self.socket.close();
    }
    self.subject.unsubscribe();
  }

  disconnect = function () {
    if (this.stompClient != undefined && this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    this.close();
    console.log("Disconnected");
  }

}
