import { Component, EventEmitter, Output } from '@angular/core';
import { ajax } from 'rxjs/ajax';
import { User } from '../../interfaces/user';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {

  @Output()
  postLogin : EventEmitter<User> = new EventEmitter();

  public user: User = {
    nombre: '',
    clave: ''
  }

  public login() {
    ajax({
      method: 'POST',
      url: 'http://localhost:3000/api/services/auth',
      body: {
        nombre: this.user.nombre,
        clave: this.user.clave
      }
    }).subscribe({
      next: (response) => {
        console.log('Response:', response);
      },
      error: (error) => {
        console.error('Error:', error);
      }
    })
  }
}
