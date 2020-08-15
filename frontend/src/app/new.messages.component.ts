import { Component } from '@angular/core';
import { WebService } from './web.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'new-message',
  template: `
    <mat-card class='card'>
      <mat-card-content>
          <!-- <form> -->

            <mat-form-field >
              <!-- <mat-label>Leave a comment</mat-label> -->
              <textarea [(ngModel)]="message.text" matInput placeholder="Message"></textarea>
            </mat-form-field>
      </mat-card-content>
            <button (click)="post()" mat-raised-button color="primary">POST</button>
        <!-- </form> -->

    </mat-card>
  `
})
export class NewMessageComponent {

  message = {
    owner: this.auth.name,
    text: ""
  }

  constructor(private webService: WebService, private auth: AuthService) {

  };

  post() {
    this.webService.postMessage(this.message);
  }

}
