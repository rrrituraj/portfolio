import {Component, OnInit} from '@angular/core';
import {webSocket} from "rxjs/webSocket";

@Component({
  selector: 'app-cna-socket',
  templateUrl: './cna-socket.component.html',
  styleUrls: ['./cna-socket.component.css']
})
export class CnaSocketComponent implements OnInit {
  stompClient: any;
  greeting: any;
  name: string;
  private socket: any;
  cases = [];
  caseId = 100005;


  constructor() {
  }

  static onClose() {
    console.log("connection closed");
  }

  ngOnInit() {
    this.socket = webSocket("ws://172.168.1.176:8080/cna/socket");
    // this.socket = webSocket("ws://172.168.1.159:8084/socket");

    this.socket.subscribe(
      msg => this.received(msg),
      err => this.onError(err),
      () => CnaSocketComponent.onClose()
    )
  }

  showGreeting(body: any) {
    if (body != undefined && !(body instanceof String)) {
      let data = JSON.stringify(body);
      this.cases.push(data);
    } else {
      this.cases.push(body);
    }
  }

  rxconnect() {
    this.cases = [];
    this.send();
  }

  received(event) {
    if (this.socket == null || this.socket == undefined) {
      this.ngOnInit();
    }
    this.showGreeting(event)
  }

  send() {
    let header = {
      case_id: this.caseId,
      case_narrative: true
    };

    if (!this.socket.closed) {
      this.socket.next(header);
    } else {
      this.ngOnInit();
      this.socket.next(header);
    }
  }

  onError(event) {
    console.log("error received");
    setTimeout(() => {
      if (this.socket != null || this.socket != undefined) {
        this.ngOnInit();
      }
    }, 5000);
  }

  _connect() {
    /*this.socket = new WebSocket('ws://localhost:8080/websocket-endpoint');
    var that = this;
    this.socket.onopen = function (event) {
      console.log('websocket is open now\n' + event);
      var header = {
        msg: 'hello veere',
        id: "10"
      };
      that.socket.send(JSON.stringify(header));
    };
    this.socket.onmessage = function (event) {
      console.log(event.data);
    }*/
  };

  _disconnect() {
    let self = this;
    if (self.socket != undefined || self.socket != null) {
      self.socket.unsubscribe();
      // self.socket = null;
      this.cases = [];
    }
  }

// on error, schedule a reconnection attempt
  errorCallBack(error) {
    console.log("errorCallBack -> " + error);
    setTimeout(() => {
      this._connect();
    }, 5000);
  }

  /**
   * Send message to sever via web socket
   * @param {*} message
   */
  _send(message) {
    console.log("calling logout api via web socket");
    this.stompClient.send("/app/hello", {}, JSON.stringify(message));
  }

  onMessageReceived(message) {
    console.log("Message Recieved from Server :: " + message);
    this.handleMessage(JSON.stringify(message.body));
  }

  handleMessage(message) {
    this.greeting = message;
  }

}
