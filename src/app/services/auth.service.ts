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

  checkTokenValidity(token: any): void {
    if (token) {
      this.http.get(`${this.url}/auth`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).subscribe(
        (response) => {
          console.log('Token Válido!', response);
        },
        (error) => {
          console.error('Token Inválido!', error);
          localStorage.removeItem('token');
        }
      );
    }
  }


  login(user : User) {
    return this.http.post<any>(`${this.url}/auth`, user);
  }
}
