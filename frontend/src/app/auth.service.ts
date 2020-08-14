import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  private BASE_URL = 'http://localhost:5000/auth';
  NAME_KEY = 'name';
  TOKEN_KEY = 'token';

  constructor(private http: HttpClient, private router: Router) {
  }

  get name() {
    return localStorage.getItem(this.NAME_KEY)
  }

  get isAuthenticated() {
    return !!localStorage.getItem(this.TOKEN_KEY)
  }

  get tokenHeader() {

    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem(this.TOKEN_KEY));

    return headers;
  }

  logout() {
    localStorage.removeItem(this.NAME_KEY);
    localStorage.removeItem(this.TOKEN_KEY);
  }

  login(loginData) {
    this.http.post(this.BASE_URL + '/login', loginData, { responseType: 'json' })
      .subscribe(
        (response: any) => {
          this.authenticate(response);
        },
        (error: any) => {
          // this.handleError(error.message);
        })
  }

  register(user) {

    delete user.confirmPassword;

    this.http.post(this.BASE_URL + '/register', user, { responseType: 'json' })
      .subscribe(
        (response: any) => {
          this.authenticate(response);
        },
        (error: any) => {
          // this.handleError(error.message);
        })
  }

  authenticate(res) {

    if (res.token) {
      localStorage.setItem(this.TOKEN_KEY, res.token);
      localStorage.setItem(this.NAME_KEY, res.firstName);
      this.router.navigate(['/']);
    }

  }

  setName(name) {
    localStorage.setItem(this.NAME_KEY, name);
    this.router.navigate(['/']);
  }
}
