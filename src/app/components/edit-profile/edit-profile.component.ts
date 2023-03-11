import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'src/app/interfaces/user';
import { Goal } from 'src/app/interfaces/goal';
import { Training } from 'src/app/interfaces/training';

import { UsersService } from 'src/app/services/users.service';

import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
  providers: [MessageService]
})
export class EditProfileComponent {

  submitted: boolean;

  users: UsersService["users"];
  genres: string[];
  goals: Goal[];
  trainings: Training[];

  user: User;

  passwordSecure: string;
  goal: Goal;
  training: Training;


  constructor(
    private router: Router,
    private usersService: UsersService,
    private messageService: MessageService
  ) {
    this.user = this.usersService.getUserCookie();
    this.users = this.usersService.getUsers();
    this.genres = ["Hombre", "Mujer"];
    this.goals = this.usersService.getGoals();
    this.trainings = this.usersService.getTrainings();

    this.submitted = false;

    this.passwordSecure = this.user.password;
    this.goal = this.usersService.getGoal(this.user.idGoal);
    this.training = this.usersService.getTraining(this.user.idTraining);
  }

  edit() {
    if (
      (this.user.email == null || this.user.email == '') || 
      (this.user.name == null || this.user.name == '') || 
      (this.user.surname == null || this.user.surname == '') ||
      (this.user.password == null || this.user.password == '') || 
      (this.passwordSecure != this.user.password) || 
      this.user.age == null || 
      this.user.weight == null || 
      this.user.height == null || 
      this.user.genre == null || 
      this.user.days == null || 
      this.goal == null || 
      this.user.weightObjective == null || 
      this.training == null
    ) {
      this.submitted = true;
    } else {
      if (!this.userExist()){
        this.user.email = this.user.email.toLowerCase();
        this.showConfirm();
      }
    }
  }

  userExist() {
    return this.usersService.userExist(this.user.email, this.user.id);
  }

  showConfirm() {
    this.messageService.clear();
    this.messageService.add({ sticky: true, severity: 'warn', summary: '¿Estás seguro?', detail: 'Confirma para guardar los datos' });
  }

  save() {
    this.messageService.clear();

    this.user.idGoal = this.goal.id;
    this.user.idTraining = this.training.id;

    this.usersService.editUser(this.user);

    this.router.navigate(['profile']);
  }

  clear() {
    this.messageService.clear();
  }

  isLogged() {
    return this.usersService.isLogged();
  }
}
