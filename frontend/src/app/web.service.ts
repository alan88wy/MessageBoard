import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class WebService {

  private BASE_URL = 'http://localhost:5000/api';
  private messageStore = [];

  private messageSubject = new Subject();

  messages = this.messageSubject.asObservable();

  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private auth: AuthService
  ) {
    this.getMessages('');
  }

  handleError(errorMessage) {
    console.log(errorMessage);
    this._snackBar.open(errorMessage, 'close', {
      duration: 2000,
    })
  }

  getMessages(owner) {

    var user = (owner) ? '/' + owner : '';
    this.http.get(this.BASE_URL + '/messages' + user, { responseType: 'json' })
      .subscribe(
        (data: any[]) => {
          this.messageStore = data;
          this.messageSubject.next(this.messageStore);
        },
        (error: any) => {
          this.handleError('Unable to get messages');
        }
      );
  }

  postMessage(message) {

    // return this.http.post(this.BASE_URL + '/messages', message)
    this.http.post(this.BASE_URL + '/messages', message, { responseType: 'json' })
      .subscribe(
        (response: any) => {
          this.messageStore.push(response);
          this.messageSubject.next(this.messageStore);
        },
        (error: any) => {
          this.handleError(error.message);
        })
  }

  getUser() {
    return this.http.get(this.BASE_URL + '/users/me',
      { headers: this.auth.tokenHeader, responseType: 'json' })
    // .subscribe(
    //   (data: any[]) => {
    //     return data
    //   },
    //   (error: any) => {
    //     this.handleError('Unable to get messages');
    //     return {}
    //   }
    // );
  }

  saveUser(userData) {
    return this.http.post(this.BASE_URL + '/users/me', userData, { headers: this.auth.tokenHeader, responseType: 'json' })
      .subscribe(
        (response: any) => {
          this.auth.setName(response.firstName);
        },
        (error: any) => {
          this.handleError('Unable to save user data');
          return {}
        }
      );
  }
}