import { Component } from '@angular/core';
import { MessagesComponent } from './messages.component';
import { NewMessageComponent } from './new.messages.component';
import { NavComponent } from './nav.component';

@Component({
  selector: 'home',
  template: `
    <new-message></new-message>
    <messages></messages>`,
  styleUrls: ['./app.component.css'],
})
export class HomeComponent {
  title = 'Message Board';
}
