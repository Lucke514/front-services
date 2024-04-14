import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthService } from '@services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private http = inject( HttpClient );
  private url : string = AuthService.url;
  constructor() { }

  // * Funcionalidad para solicitar todos los servicios al servidor
  // ! Se debe Enviar el Token ademas ya que se esta forma el servidor valida que el usuario inició sesión
  public getServices(token: string) {
    return new Promise((resolve, reject) => {
      if (token) {
        fetch(this.url + '/servicio', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }).then((response) => {
          response.json().then((data) => {
            resolve(data);
          });
        }
        ).catch((error) => {
          console.error('Error al obtener los servicios', error);
          reject(error);
        });
      } else {
        reject('Token no recibido');
      }
    });
  }
}
