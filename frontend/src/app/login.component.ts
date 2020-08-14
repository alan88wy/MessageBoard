import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'login',
  template: `
  <mat-card>

        <mat-form-field>
          <mat-label>Email</mat-label>
          <input [(ngModel)]="loginData.email" type="email" style='width: 350px;' matInput
            placeholder="Enter Email">
        </mat-form-field>
        <br>
        <mat-form-field>
          <mat-label>Password</mat-label>
          <input [(ngModel)]="loginData.password" type="password" autocomplete="off" style='width: 350px;'
            matInput placeholder="Enter Password">
        </mat-form-field>
        <br>
        <button mat-raised-button color='primary' (click)="login()">Login</button>

  </mat-card>
  `
})
export class LoginComponent {

  loginData = {
    email: '',
    password: ''
  }

  constructor(public auth: AuthService) { };

  login() {
    this.auth.login(this.loginData);
  }

}
