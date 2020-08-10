import { Component } from '@angular/core';
import { MessagesComponent } from './messages.component';
import { NewMessageComponent } from './new.messages.component';

@Component({
  selector: 'app-root',
  template: `<h1>Hello {{ title }}</h1>
    <new-message></new-message>
    <messages></messages>`,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'My test App';
}
