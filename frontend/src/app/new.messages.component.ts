import { Component, Output, EventEmitter } from '@angular/core';
import { WebService } from './web.service';


@Component({
  selector: 'new-message',
  template: `
    <mat-card class='card'>
      <mat-card-content>
          <!-- <form> -->
            <mat-form-field>
              <!-- <mat-label>Favorite food</mat-label> -->
              <input [(ngModel)]="message.owner" matInput placeholder="Name" >
            </mat-form-field>

            <mat-form-field >
              <!-- <mat-label>Leave a comment</mat-label> -->
              <textarea [(ngModel)]="message.text" matInput placeholder="Message"></textarea>
            </mat-form-field>
      </mat-card-content>
            <button (click)="post()" mat-stroked-button color="primary">POST</button>
        <!-- </form> -->

    </mat-card>
  `
})
export class NewMessageComponent {

  message = {
    owner: "",
    text: ""
  }

  @Output() onPosted = new EventEmitter();

  constructor(private webService: WebService) {

  };

  post() {
    this.webService.postMessage(this.message)
      .subscribe(
        (response: any) => {
          console.log(response)
          // location.reload()
        },
        (error: any) => {
          console.log(error)
        })

    this.onPosted.emit(this.message);

  }

}
