import { Component, OnInit } from '@angular/core';
import { WebService } from './web.service';


@Component({
  selector: 'new-message',
  template: `
    <mat-card class='card'>
      <mat-card-content>
          <!-- <form> -->
            <mat-form-field>
              <!-- <mat-label>Favorite food</mat-label> -->
              <input matInput placeholder="Name">
            </mat-form-field>

            <mat-form-field >
              <!-- <mat-label>Leave a comment</mat-label> -->
              <textarea matInput placeholder="Message"></textarea>
            </mat-form-field>
      </mat-card-content>
            <button mat-stroked-button color="primary">POST</button>
        <!-- </form> -->

    </mat-card>
  `
})
export class NewMessageComponent {

  constructor(private webService: WebService) { };


}
