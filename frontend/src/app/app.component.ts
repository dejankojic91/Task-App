import { Component, OnInit } from '@angular/core';

import '../assets/css/styles.css';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{ 
  public user: any;
  public currentUserId: any;

  constructor() {}

  ngOnInit() {

  }

}
