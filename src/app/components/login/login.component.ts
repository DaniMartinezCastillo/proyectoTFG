import { Component } from '@angular/core';

import { UsersService } from '../../services/users.service';

import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent {

  users: UsersService["users"];
  email!: string;
  password!: string;

  constructor(
    private usersService: UsersService,
    private messageService: MessageService
  ) {
    this.users = this.usersService.getUsers();
  }

  onSubmit() {
    if (
      this.email == null && this.password == null || 
      this.email == '' && this.password == ''
    ) {
      return this.showErrorNullAll();
    } else {
      if (this.email == null || this.email == '') {
        return this.showErrorNullEmail();
      } else {
        if (this.password == null || this.password == '') {
          return this.showErrorNullPassword();
        } else {
          this.email = this.email.toLowerCase(); //pasa todo lo escrito a minúscula
          for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].email == this.email) {
              if (this.users[i].password == this.password) {
                return this.usersService.login(this.users[i].id);//añadimos una cookie con el id del usuario
              }
            }
          }
        }
      }
    }
    return this.showError();
  }

  //Mensaje de campos de email y contraseña vacíos
  showErrorNullAll() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Introduzca el email y la contraseña' });
  }

  //Mensaje de campo de email vacío
  showErrorNullEmail() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Introduzca el email' });
  }

  //Mensaje de campo de contraseña vacío
  showErrorNullPassword() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Introduzca la contraseña' });
  }

  //Mensaje de campos de usuario y/o contraseña inválidos (porque el usuario no existe o porque existe pero 
  //la contraseña introducida es incorrecta)
  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Usuario y/o contraseña inválidos' });
  }
}
