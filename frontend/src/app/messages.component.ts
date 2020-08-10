import { Component, OnInit } from '@angular/core';
import { WebService } from './web.service';


@Component({
  selector: 'messages',
  template: `
  <div *ngFor='let message of messages'>

  <mat-card class='card'>
    <!-- <mat-card-header> -->
      <mat-card-title>{{ message.owner }} </mat-card-title>
    <!-- </mat-card-header> -->
    <mat-card-content>
      {{ message.text }}
    </mat-card-content>

  </mat-card>

   </div>

  `
})
export class MessagesComponent implements OnInit {

  messages = [];

  constructor(private webService: WebService) { };

  ngOnInit() {
    this.webService.getMessages()
      .subscribe(
        (data: any[]) => this.messages = data,
        err => console.error('Error getting messages: ' + err)
      );

  }
}
