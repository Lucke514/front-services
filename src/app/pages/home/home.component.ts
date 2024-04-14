import { Component, Inject } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent {
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


      if (localStorage) {
        // Obteniendo el token del localStorage
        const token = localStorage.getItem('token');
        if (token) {

          // Verificar si el token es válido mediante el servicio de autenticación
          this.authService.checkTokenValidity(token).then((response) => {
            if (response.isAuth) {
              alert('Bienvenido : ' + response.user)
            } else {
              // Si el token no es válido, se elimina del localStorage
              localStorage.removeItem('token');

              // Redirigiendo al usuario a la página de inicio de sesión
              this.document.defaultView?.location.replace('/login');
            }
          });

          // Volver a guardar el token en el localStorage
          localStorage.setItem('token', token);
        }
      }
    }

}
