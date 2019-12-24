import {Component, OnInit} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {webSocket, WebSocketSubject} from "rxjs/webSocket";
import {Subject} from "rxjs";

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
  private socket: WebSocket;


  constructor() {
  }

  ngOnInit() {
    this.socket = new WebSocket('ws://localhost:8080/websocket-endpoint');
  }


  rxconnect() {
    // let subject: WebSocketSubject =  webSocket("ws://localhost:8080/websocket-endpoint");
    // subject.subscribe(datafromserverA=>console.log(datafromserverA));
    /*  const observableA = subject.multiplex(
        () => ({subscribe: 'A'}),s // When server gets this message, it will start sending messages for 'A'...
        () => ({unsubscribe: 'A'}), // ...and when gets this one, it will stop.
        message => true // If the function returns `true` message is passed down the stream. Skipped if the function returns false.
      );
      const subA = observableA.subscribe(messageForA => console.log(messageForA));
     */
    /*subject.asObservable().pipe().subscribe(
      msg => console.log('message received: ' + msg), // Called whenever there is a message from the server.
      err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
      () => console.log('closed') // Called when connection is closed (for whatever reason).
    );*/

  }

  _connect() {
    this.socket = new WebSocket('ws://localhost:8080/websocket-endpoint');
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
    }
  }
  ;

  _disconnect() {
    this.socket.close();
  }

// on error, schedule a reconnection attempt
  errorCallBack(error) {
    console.log("errorCallBack -> " + error)
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
