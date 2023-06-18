import { Component } from '@angular/core';

import { UsersService } from '../../services/users.service';
import { FirebaseService } from 'src/app/services/firebase.service';

import { User } from 'src/app/interfaces/user';

import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent {

  users!: User[];

  email_username!: string;
  password!: string;

  constructor(
    private usersService: UsersService,
    private messageService: MessageService,
    private firebaseService: FirebaseService
  ) { }

  ngOnInit(){
    this.firebaseService.getUsers().subscribe((users: User[])=> {
      this.users = users;
      this.usersService.setUsers(this.users);
    });
  }

  onSubmit() {
    if (
      this.email_username == null && this.password == null || 
      this.email_username == '' && this.password == ''
    ) {
      return this.showErrorNullAll();
    } else {
      if (this.email_username == null || this.email_username == '') {
        return this.showErrorNullEmail();
      } else {
        if (this.password == null || this.password == '') {
          return this.showErrorNullPassword();
        } else {
          this.email_username = this.email_username.toLowerCase(); //pasa todo lo escrito a minúscula
          for (let user of this.users) {
            if (user.email == this.email_username || user.userName == this.email_username) {
              if (user.password == this.password) {
                return this.usersService.login(user.userName);//añadimos una cookie con el nombre de usuario del usuario
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
