import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable()
export class WebService {

  BASE_URL = 'http://localhost:5000/api';
  messages = [];

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {
    this.getMessages();
  }

  handleError(errorMessage) {
    console.log(errorMessage);
    this._snackBar.open(errorMessage, 'close', {
      duration: 2000,
    })
  }

  getMessages() {
    // return this.http.get(this.BASE_URL + '/messages')

    const params = new HttpParams();
    this.http.request('GET', this.BASE_URL + '/messages', { responseType: 'json', params })
      .subscribe(
        (data: any[]) => this.messages = data,
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
          this.messages.push(JSON.parse(response));
        },
        (error: any) => {
          this.handleError(error.message);
        })
  }
}