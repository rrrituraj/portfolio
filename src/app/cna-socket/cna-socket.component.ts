import {Component, OnInit} from '@angular/core';
import {webSocket} from "rxjs/webSocket";

@Component({
  selector: 'app-cna-socket',
  templateUrl: './cna-socket.component.html',
  styleUrls: ['./cna-socket.component.css']
})
export class CnaSocketComponent implements OnInit {
  webSocketEndPoint: string = 'http://localhost:8080/websocket-endpoint';
  topic: string = '/queue/greeting';
  stompClient: any;
  greeting: any;
  name: string;
  private socket: any;


  constructor() {
  }

  ngOnInit() {
  }


  rxconnect() {
    let header = {
      caseId: this.name
    };

    this.socket = webSocket("ws://localhost:8084/socket");

    this.socket.subscribe(
      msg => console.log(msg),
      err => console.log(err),
      () => console.log('complete'));

    this.socket.next(JSON.stringify(header));


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
    if (this.socket != undefined || this.socket != null) {
      this.socket.unsubscribe();
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
