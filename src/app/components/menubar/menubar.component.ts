import { Component, OnInit } from '@angular/core';

import { LoginService } from 'src/app/services/login.service';
import { UsersService } from 'src/app/services/users.service';

import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {

  existeCookie: boolean = false;
  items!: MenuItem[];
  user;
  infoUser!: MenuItem[];

  constructor(
    private loginService: LoginService,
    private usersService: UsersService
  ) { 
    this.user = this.usersService.getUserCookie();
  }
   

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: '/portal'
      },
    ];

    this.infoUser = [
      {
        label: 'Bienvenido ' + this.user.name,
        icon: 'pi pi-user',
        routerLink: '/profile'
      },
    ];
  }

  logout() {
    this.loginService.logout();
  }

  isLogged() {
    return this.loginService.isLogged();
  }

}
