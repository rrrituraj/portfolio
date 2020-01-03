import {Component, Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, retry} from "rxjs/operators";
import {Observable} from "rxjs";

@Component({
  selector: 'app-cna-rest',
  templateUrl: './cna-rest.component.html',
  styleUrls: ['./cna-rest.component.css']
})
@Injectable()
export class CnaRestComponent implements OnInit {
  caseId: string = '100564';
  url: string = 'http://localhost:8084/casenarrative/integrate/get/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

  getIntegratedResult(){
    var self = this;
 
    let address = this.url + this.caseId;
    this.http.get(address, this.httpOptions).subscribe(result=>{
		console.log(result);
	});

  }

  handleError() {
    console.log("error");
  }

}
