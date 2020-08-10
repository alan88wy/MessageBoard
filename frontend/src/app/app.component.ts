import { Component, ViewChild } from '@angular/core';
import { MessagesComponent } from './messages.component';
import { NewMessageComponent } from './new.messages.component';

@Component({
  selector: 'app-root',
  template: `<h1>{{ title }}</h1>
    <new-message (onPosted)="onPosted($event)"></new-message>
    <messages></messages>`,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Message Board';

  @ViewChild(MessagesComponent) messages: MessagesComponent;

  onPosted(message) {
    this.messages.messages.push(message);
  }
}
