import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  logout() {
    localStorage.removeItem(this.NAME_KEY);
    localStorage.removeItem(this.TOKEN_KEY);
  }
  register(user) {

    delete user.confirmPassword;

    this.http.post(this.BASE_URL + '/register', user, { responseType: 'json' })
      .subscribe(
        (response: any) => {
          let authResponse = response;
          localStorage.setItem(this.TOKEN_KEY, authResponse.token);
          localStorage.setItem(this.NAME_KEY, authResponse.firstName);
          this.router.navigate(['/']);
        },
        (error: any) => {
          // this.handleError(error.message);
        })
  }
}
