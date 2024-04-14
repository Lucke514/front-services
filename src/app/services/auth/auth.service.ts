import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../../interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject( HttpClient );
  // ! Localhost
  public static url = 'http://localhost:3000/api/services';

  // ! Producción
  //private url = 'https://services.lucke.cl/api/services';

  constructor() { }

  // TODO : Pasar la funcion de validar el token para que devuelva un booleano y poder hacer la validación!!
  checkTokenValidity(token: string): Promise<{ isAuth: boolean, user: any }> {
    return new Promise<{ isAuth: boolean, user: any }>((resolve, reject) => {
      if (token) {
        this.http.get<{ user: any, isAuth: boolean }>(`${AuthService.url}/auth`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }).subscribe(
          (response) => {
            resolve({
              isAuth: response.isAuth,
              user: response.user
            });
          },
          (error) => {
            console.error('Token Inválido!', error);
            localStorage.removeItem('token');
            resolve({
              isAuth: false,
              user: null
            });
          }
        );
      } else {
        resolve({
          isAuth: false,
          user: null
        });
      }
    });
  }

  // * Funcionalidad para enviar el token al servidor y validar si es válido
  checkTokenRequest(token: string) : Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      if (token) {
        this.http.get<{ isAuth: boolean }>(`${AuthService.url}/auth`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }).subscribe(
          (response) => {
            resolve(response.isAuth);
          },
          (error) => {
            console.error('Token Inválido!', error);
            localStorage.removeItem('token');
            resolve(false);
          }
        );
      } else {
        resolve(false);
      }
    });
  }

  // * Funcionalidad para iniciar sesión
  login(user : User) {
    return this.http.post<any>(`${AuthService.url}/auth`, user);
  }
}
