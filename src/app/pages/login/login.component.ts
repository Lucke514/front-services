import { Component, EventEmitter, Output } from '@angular/core';
import { User } from '../../interfaces/user';
import { FormsModule, NgModel } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {
  auth = new AuthService();

  public user: User = {
    nombre: '',
    clave: ''
  }

  public login() {
    this.auth.login(this.user).subscribe(
      (response) => {
        console.log(response);
        localStorage.setItem('token', response.jwv);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
