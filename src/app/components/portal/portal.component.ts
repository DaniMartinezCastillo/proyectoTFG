import { Component } from '@angular/core';

import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent {

  constructor(
    private usersService: UsersService
  ) {}

  isLogged() {
    return this.usersService.isLogged();
  }
}
