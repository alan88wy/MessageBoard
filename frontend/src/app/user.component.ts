import { Component } from '@angular/core';
import { WebService } from './web.service';


@Component({
  selector: 'user',
  template: `
    <mat-card class='card'>
      <mat-card-content>
          <!-- <form> -->
            <mat-form-field>
              <input [(ngModel)]="model.firstName" matInput placeholder="First Name" >
            </mat-form-field>
            <br>
            <mat-form-field>
              <input [(ngModel)]="model.lastName" matInput placeholder="Last Name" >
            </mat-form-field>

       </mat-card-content>
            <button (click)="saveUser(model)" mat-raised-button color="primary">Save Changes</button>
        <!-- </form> -->

    </mat-card>
  `
})
export class UserComponent {

  model = {
    firstName: "",
    lastName: ""
  }

  constructor(private webService: WebService) {

  };

  ngOnInit() {

    this.webService.getUser()
      .subscribe((res: any) => {

        this.model.firstName = res.firstName;
        this.model.lastName = res.lastName;

      })

  }

  saveUser(userData) {
    this.webService.saveUser(userData);
  }

}
