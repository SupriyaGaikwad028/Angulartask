import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { User } from '../models/user';


@Injectable()
export class AuthService {
  private BASE_URL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyD8W0pWlju6wOPr3ih_aio2gNiVKHd9F8g';

  constructor(private http: HttpClient) {}

  getToken(): string {
    return localStorage.getItem('token');
    
  }

  logIn(email: string, password: string): Observable<any> {
    const url = this.BASE_URL;
    return this.http.post<User>(url, {email, password,"returnSecureToken": true });
  }

  
}