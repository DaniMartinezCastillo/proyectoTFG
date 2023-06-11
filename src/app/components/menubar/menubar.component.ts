import { Component } from '@angular/core';

import { UsersService } from 'src/app/services/users.service';
import { FirebaseService } from 'src/app/services/firebase.service';

import { User } from 'src/app/interfaces/user';
import { Communication } from 'src/app/interfaces/communication';

import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent {
  user!: User;
  infoUserMan!: MenuItem[];
  infoUserWoman!: MenuItem[];

  numPage!: number;
  communication!: Communication;
  home!: MenuItem;
  items: MenuItem[] = [];
  items1!: MenuItem[];
  items2!: MenuItem[];
  items3!: MenuItem[];

  constructor(
    private usersService: UsersService,
    private firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    this.firebaseService.getUsers().subscribe((users: User[]) => {
      this.usersService.setUsers(users);

      this.user = this.usersService.getUserCookie();

      this.firebaseService.getCommunications().subscribe((communications: Communication[]) => {
        this.usersService.setCommunications(communications);

        if (this.user.id != undefined) {
          this.communication = this.usersService.getCommunication(this.user.id);
          this.numPage = this.communication.numPage;
        }

        this.home = { title: 'Fit App', icon: 'pi pi-home', routerLink: '/portal' }

        this.items1 = [{ label: 'Rutina', routerLink: '/routine' }];
        this.items2 = [{ label: 'Perfil', routerLink: '/profile' }];
        this.items3 = [{ label: 'Pefil', routerLink: '/profile' }, { label: 'Editar Perfil', routerLink: '/editProfile' }];

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
