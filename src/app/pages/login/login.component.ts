import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '@services/auth.service';
import { DOCUMENT } from '@angular/common';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {
  public user: User = {
    nombre: '',
    clave: ''
  };
  public rememberMe: boolean = false;

  // * Metodo para constructor que se ejecuta al iniciar el componente *
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private authService: AuthService
  ) {
    this.checkToken();
  }

  // * Método para verificar si el token es valido *
  private checkToken() {
    // Obteniendo el localStorage para poder hacer la consulta del token
    const localStorage = this.document.defaultView?.localStorage;


    // TODO : Pasar la funcion de validar el token para que devuelva un booleano y poder hacer la validación!!
    if (localStorage) {
      // Obteniendo el token del localStorage
      const token = localStorage.getItem('token');
      if (token) {

        // Verificar si el token es válido mediante el servicio de autenticación
        this.authService.checkTokenValidity(token);


        // Volver a guardar el token en el localStorage
        localStorage.setItem('token', token);
      }
    }
  }

  // * Método para iniciar sesión *
  public login() {
    this.authService.login(this.user).subscribe(
      (response) => {
        console.log(response);
        localStorage.setItem('token', response.token);
      },
      (error) => {
        console.error('Error al iniciar sesión, nombre de usuario o contraseña incorrectos');
      }
    );

    this.reloadUser();
  }

  // * Metodo actual para poder reiniciar los datos del usuario *
  reloadUser() {
    this.user = {
      nombre: '',
      clave: ''
    };
  }
}
