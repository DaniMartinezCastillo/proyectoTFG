import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

import { UsersService } from 'src/app/services/users.service';
import { GoalsService } from 'src/app/services/goals.service';
import { TrainingsService } from 'src/app/services/trainings.service';
import { LoginService } from 'src/app/services/login.service';

import { User } from 'src/app/interfaces/user';
import { Goal } from 'src/app/interfaces/goal';
import { Training } from 'src/app/interfaces/training';

import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MessageService]
})
export class RegisterComponent {
  steps!: MenuItem[];

  activeIndex: number;
  submitted: boolean;
  userExist: boolean;

  users: UsersService["users"];
  genres: string[];
  goals: GoalsService["goals"];
  trainings: TrainingsService["trainings"];

  newUser!: User;

  name!: string;
  surname!: string;
  email!: string;
  password!: string;
  passwordSecure!: string;
  age: number;
  weight: number;
  genre!: string;
  height: number;
  days: number;
  weightObjective: number;

  goal!: Goal;
  training!: Training;

  constructor(
    private router: Router,
    private usersService: UsersService,
    private goalsService: GoalsService,
    private trainingsService: TrainingsService,
    private loginService: LoginService,
    private messageService: MessageService
  ) {
    this.users = this.usersService.getUsers();
    this.genres = ["Hombre", "Mujer"];
    this.goals = this.goalsService.getGoals();
    this.trainings = this.trainingsService.getTrainings();

    this.activeIndex = 0;
    this.submitted = false;
    this.userExist = false;

    this.age = 25;
    this.weight = 60.50;
    this.height = 170;
    this.days = 3;
    this.weightObjective = 60.50;
  }

  ngOnInit() {
    this.steps = [{
      label: 'Datos de usuario',
      command: () => {
        this.activeIndex = 0;
        this.messageService.add({ severity: 'info', summary: 'Primer paso', detail: 'Datos de usuario' });
      }
    },
    {
      label: 'Datos personales',
      command: () => {
        this.activeIndex = 1;
        this.messageService.add({ severity: 'info', summary: 'Segundo paso', detail: 'Datos personales' });
      }
    },
    {
      label: 'Objetivos',
      command: () => {
        this.activeIndex = 2;
        this.messageService.add({ severity: 'info', summary: 'Tercer paso', detail: 'Objetivos' });
      }
    }
    ];
  }

  back() {
    switch (this.activeIndex) {
      case 0:
        this.router.navigate(['']);
        break;
      case 1:
        this.activeIndex--;
        break;
      case 2:
        this.activeIndex--;
    }
  }

  nextPage() {
    switch (this.activeIndex) {
      case 0:
        this.page1();
        break;
      case 1:
        this.page2();
        break;
      case 2:
        this.page3();
    }
  }

  page1() {
    if ((this.email == null || this.email == '') || (this.name == null || this.name == '') || (this.surname == null || this.surname == '') ||
      (this.password == null || this.password == '') || (this.passwordSecure != this.password)) {
      this.submitted = true;
    } else {
      this.email = this.email.toLowerCase();
      for (let i = 0; i < this.users.length; i++) {
        if (this.email == this.users[i].email) {
          this.userExist = true;
          return;
        }
      }
      this.activeIndex++;
      this.submitted = false;
    }
  }

  page2() {
    if (this.age == null || this.weight == null || this.height == null || this.genre == null) {
      this.submitted = true;
    } else {
      this.activeIndex++;
      this.submitted = false;
    }
  }

  page3() {
    if (this.days == null || this.goal == null || this.weightObjective == null || this.training == null) {
      this.submitted = true;
    } else {
      this.newUser = {
        id: this.users.length,
        name: this.name,
        surname: this.surname,
        email: this.email,
        password: this.password,
        age: this.age,
        weight: this.weight,
        genre: this.genre,
        height: this.height,
        days: this.days,
        weightObjective: this.weightObjective,
        goalId: this.goal.id,
        trainingId: this.training.id,
      };
      this.usersService.addUser(this.newUser);
      this.loginService.login(this.newUser.id.toString());//añadimos una cookie con el id del usuario. La cookie solo utiliza parametros string
      this.router.navigate(['portal']);
    };
  }
}
