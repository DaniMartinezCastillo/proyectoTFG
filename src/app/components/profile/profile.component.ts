import { Component } from '@angular/core';

import { User } from 'src/app/interfaces/user';
import { Goal } from 'src/app/interfaces/goal';
import { Training } from 'src/app/interfaces/training';

import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  user: User;
  goal: Goal;
  training: Training;

  constructor(
    private usersService: UsersService
  ) {
    //Datos del usuario que ha iniciado sesión
    this.user = this.usersService.getUserCookie();
    this.goal = this.usersService.getGoal(this.user.idGoal);
    this.training = this.usersService.getTraining(this.user.idTraining);
  }

  //Función que hará que no puedas entrar a la página si no has iniciado sesión
  isLogged() {
    return this.usersService.isLogged();
  }

}
