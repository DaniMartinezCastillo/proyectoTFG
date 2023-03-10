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
    this.user = this.usersService.getUserCookie();
    this.goal = this.usersService.getGoal(this.user.idGoal);
    this.training = this.usersService.getTraining(this.user.idTraining);
  }

  isLogged() {
    return this.usersService.isLogged();
  }

}
