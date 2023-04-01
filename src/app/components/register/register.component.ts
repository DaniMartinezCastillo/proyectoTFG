import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

import { User } from 'src/app/interfaces/user';
import { Goal } from 'src/app/interfaces/goal';
import { Training } from 'src/app/interfaces/training';

import { UsersService } from 'src/app/services/users.service';

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

  users: UsersService["users"];
  genres: string[];
  goals: Goal[];
  trainings: Training[];

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
    private messageService: MessageService
  ) {
    this.users = this.usersService.getUsers();
    this.genres = ["Hombre", "Mujer"];
    this.goals = this.usersService.getGoals();
    this.trainings = this.usersService.getTrainings();

    this.activeIndex = 0;
    this.submitted = false;

    this.age = 25;
    this.weight = 60.50;
    this.height = 170;
    this.days = 4;
    this.weightObjective = 60.50;
  }

  ngOnInit() {
    //Páginas de registro
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

  //Función que te llevará a una página u a otra al pulsar el botón Volver (dependiendo de la 
  //página en la que estes situado)
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

  //Función que te llevará a una función u a otra al pulsar el botón Siguiente (dependiendo de la 
  //página en la que estes situado)
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

  //Función que comprueba si el email introducido ya existe
  userExist() {
    if (this.email != null) {
      return this.usersService.userExist(this.email, this.users.length);
    }
    return false
  }

  //Función que comprueba que los datos introducidos son válidos
  page1() {
    if (
      (this.email == null || this.email == '') || 
      (this.name == null || this.name == '') || 
      (this.surname == null || this.surname == '') ||
      (this.password == null || this.password == '') || 
      (this.passwordSecure != this.password)
    ) {
      this.submitted = true;
    } else {
      if (!this.userExist()) {
        this.email = this.email.toLowerCase();
        this.activeIndex++;
        this.submitted = false;
      }
    }
  }

  //Función que comprueba que los datos introducidos son válidos
  page2() {
    if (
      this.age == null || 
      this.weight == null || 
      this.height == null || 
      this.genre == null
    ) {
      this.submitted = true;
    } else {
      this.activeIndex++;
      this.submitted = false;
    }
  }

  //Función que comprueba que los datos introducidos son válidos
  //Si son válidos querrá decir que todos los datos lo son y por lo tanto
  //logeará al usuario y lo llevará a la página principal
  page3() {
    if (
      this.days == null || 
      this.goal == null || 
      this.weightObjective == null || 
      this.training == null
    ) {
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
        idGoal: this.goal.id,
        idTraining: this.training.id,
      };
      this.usersService.addUser(this.newUser);
      this.usersService.login(this.newUser.id);//añadimos una cookie con el id del usuario
    };
  }
}
