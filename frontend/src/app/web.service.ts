import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Injectable()
export class WebService {

  private BASE_URL = 'http://localhost:5000/api';
  private messageStore = [];

  private messageSubject = new Subject();

  messages = this.messageSubject.asObservable();

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {
    this.getMessages('');
  }

  handleError(errorMessage) {
    console.log(errorMessage);
    this._snackBar.open(errorMessage, 'close', {
      duration: 2000,
    })
  }

  getMessages(owner) {
    // return this.http.get(this.BASE_URL + '/messages')

    const params = new HttpParams();
    var user = (owner) ? '/' + owner : '';
    this.http.request('GET', this.BASE_URL + '/messages' + user, { responseType: 'json', params })
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
    this.http.post(this.BASE_URL + '/messages', message, { responseType: 'text' })
      .subscribe(
        (response: any) => {
          this.messageStore.push(JSON.parse(response));
          this.messageSubject.next(this.messageStore);
        },
        (error: any) => {
          this.handleError(error.message);
        })
  }
}