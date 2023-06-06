import { Component } from '@angular/core';

import { UsersService } from 'src/app/services/users.service';
import { FirebaseService } from 'src/app/services/firebase.service';

import { User } from 'src/app/interfaces/user';

import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent {
  items!: MenuItem[];
  user!: User;
  infoUserMan!: MenuItem[];
  infoUserWoman!: MenuItem[];

  constructor(
    private usersService: UsersService,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit() {
    this.firebaseService.getUsers().subscribe((users: User[]) => {
      this.usersService.setUsers(users);
      
      this.user = this.usersService.getUserCookie();

      this.items = [
        {
          title: 'Fit App',
          label: 'Home',
          icon: 'pi pi-home',
          routerLink: '/portal'
        },
      ];

      this.infoUserMan = [
        {
          title: 'Perfil',
          label: 'Bienvenido ' + this.user.name,
          icon: 'pi pi-user',
          routerLink: '/profile'
        },
      ];

      this.infoUserWoman = [
        {
          title: 'Perfil',
          label: 'Bienvenida ' + this.user.name,
          icon: 'pi pi-user',
          routerLink: '/profile'
        },
      ];
    });
  }

  //Función que sirve para cerrar sesión
  logout() {
    this.usersService.logout();
  }

  //Función que hará que no puedas entrar a la página si no has iniciado sesión
  isLogged() {
    return this.usersService.isLogged();
  }

}
