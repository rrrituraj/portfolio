import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  working = '<a href=\'www.vitrana.com\'>Vitrana</a>';
  title = "Currently Working at Vitrana as a Software engineer.";

  constructor() {
  }

  ngOnInit() {
  }

}
