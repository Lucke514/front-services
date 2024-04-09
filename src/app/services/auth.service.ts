import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { User, UserLoginResponse } from '../interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject( HttpClient );
  private url = 'http://localhost:3000/api/services';

  constructor() { }

  checkTokenValidity(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.http.get(`${this.url}/auth`).subscribe(
        (response) => {
          console.log('Token is valid:', response);
        },
        (error) => {
          console.error('Token is invalid:', error);
          localStorage.removeItem('token');
        }
      );
    }
  }

  login(user : User) {
    return this.http.post<UserLoginResponse>(`${this.url}/auth`, user);
  }
}