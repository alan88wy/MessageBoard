import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class WebService {

  BASE_URL = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  handleError() {
    console.log("Error saving message : ")
  }
  getMessages() {
    // return this.http.get(this.BASE_URL + '/messages')

    const params = new HttpParams();
    return this.http.request('GET', this.BASE_URL + '/messages', { responseType: 'json', params });
  }

  postMessage(message) {

    // return this.http.post(this.BASE_URL + '/messages', message)
    return this.http.post(this.BASE_URL + '/messages', message, { responseType: 'text' })
    // .pipe(catchError(err => this.handleError()));
  }
}