import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'src/app/interfaces/user';
import { Goal } from 'src/app/interfaces/goal';
import { Training } from 'src/app/interfaces/training';

import { UsersService } from 'src/app/services/users.service';
import { GoalsService } from 'src/app/services/goals.service';
import { TrainingsService } from 'src/app/services/trainings.service';

import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
  providers: [MessageService]
})
export class EditProfileComponent {

  submitted: boolean;
  correct: boolean;

  users: UsersService["users"];
  genres: string[];
  goals: GoalsService["goals"];
  trainings: TrainingsService["trainings"];

  user: User;

  passwordSecure: string;
  goal: Goal;
  training: Training;


  constructor(
    private router: Router,
    private usersService: UsersService,
    private goalsService: GoalsService,
    private trainingsService: TrainingsService,
    private messageService: MessageService
  ) {
    this.user = this.usersService.getUserCookie();
    this.users = this.usersService.getUsers();
    this.genres = ["Hombre", "Mujer"];
    this.goals = this.goalsService.getGoals();
    this.trainings = this.trainingsService.getTrainings();

    this.submitted = false;
    this.correct = false;

    this.passwordSecure = this.user.password;
    this.goal = this.usersService.getGoal(this.user.goalId);
    this.training = this.usersService.getTraining(this.user.trainingId);
  }

  edit() {
    if ((this.user.email == null || this.user.email == '') || (this.user.name == null || this.user.name == '') || (this.user.surname == null || this.user.surname == '') ||
      (this.user.password == null || this.user.password == '') || (this.passwordSecure != this.user.password) || this.user.age == null || this.user.weight == null || 
      this.user.height == null || this.user.genre == null || this.user.days == null || this.goal == null || this.user.weightObjective == null || this.training == null) {
      this.submitted = true;
    } else {
      for (let i = 0; i < this.users.length; i++) {
        if (this.user.email == this.users[i].email && this.user.id != this.users[i].id) {
          this.correct = true;
          break;
        }
      }
      if (!this.correct) {
        this.showConfirm();
      }
    }
  }

  showConfirm() {
    this.messageService.clear();
    this.messageService.add({ sticky: true, severity: 'warn', summary: '¿Estás seguro?', detail: 'Confirma para guardar los datos' });
  }

  save() {
    this.messageService.clear();

    this.user.goalId = this.goal.id;
    this.user.trainingId = this.training.id;

    this.usersService.editUser(this.user);

    this.router.navigate(['profile']);
  }

  clear() {
    this.messageService.clear();
  }


}
