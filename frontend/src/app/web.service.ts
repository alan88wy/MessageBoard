import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class WebService {

  BASE_URL = 'http://localhost:5000/api';
  messages = [];

  constructor(private http: HttpClient) {
    this.getMessages();
  }

  handleError() {
    console.log("Error saving message : ")
  }
  getMessages() {
    // return this.http.get(this.BASE_URL + '/messages')

    const params = new HttpParams();
    this.http.request('GET', this.BASE_URL + '/messages', { responseType: 'json', params })
      .subscribe(
        (data: any[]) => this.messages = data,
        err => console.error('Error getting messages: ' + err)
      );
  }

  postMessage(message) {

    // return this.http.post(this.BASE_URL + '/messages', message)
    this.http.post(this.BASE_URL + '/messages', message, { responseType: 'text' })
      .subscribe(
        (response: any) => {
          this.messages.push(response);
        },
        (error: any) => {
          console.log(error)
        })
  }
}