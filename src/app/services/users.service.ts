import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../interfaces/user';
import { LoginService } from './login.service';
import { GoalsService } from './goals.service';
import { TrainingsService } from './trainings.service';



@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users: User[] = [ //ejemplo de usuarios (no es la BBDD)
    //El id simula el id de mongo y será el que utiliza la cookie
    {
      id: 0,
      name: "Pablo",
      surname: "Ruiz García",
      email: "pablo@pablo.com",
      password: "pablo",
      age: 30,
      weight: 75.50,
      genre: "Hombre",
      height: 173,
      days: 3,
      weightObjective: 75.50,
      idGoal: 1,
      idTraining: 0,
    },
    {
      id: 1,
      name: "Dani",
      surname: "Martinez Castillo",
      email: "dani@dani.com",
      password: "dani",
      age: 22,
      weight: 80,
      genre: "Hombre",
      height: 185,
      days: 4,
      weightObjective: 87.50,
      idGoal: 2,
      idTraining: 1,
    },
    {
      id: 2,
      name: "Elisa",
      surname: "Martínez Castillo",
      email: "elisa@elisa.com",
      password: "elisa",
      age: 16,
      weight: 65,
      genre: "Mujer",
      height: 164,
      days: 5,
      weightObjective: 60,
      idGoal: 0,
      idTraining: 0,
    },
    {
      id: 3,
      name: "Arantxa",
      surname: "Murcia Manjon",
      email: "arantxa@arantxa.com",
      password: "arantxa",
      age: 19,
      weight: 61.50,
      genre: "Mujer",
      height: 173,
      days: 4,
      weightObjective: 65,
      idGoal: 2,
      idTraining: 1,
    },
  ]

  constructor(
    private cookies: CookieService,
    private loginService: LoginService,
    private goalsService: GoalsService,
    private trainingService: TrainingsService
  ) { }


  //Funcion que añade un usuario
  addUser(user: User) {
    this.users.push(user);
  }

  //Función que te devuelve los usuarios
  getUsers() {
    return this.users;
  }

  //Funcion que te devuelve el usuario que tiene el id que le pasamos
  getUser(id: number) {
    return this.users[id];
  }

  //Funcion que te modifica los datos del usuario que le pasas
  editUser(user: User) {
    this.users[user.id] = user;
  }

  userExist(email: string, id: number) {
    email = email.toLowerCase();
    for (let i = 0; i < this.users.length; i++) {
      if (email == this.users[i].email && id != this.users[i].id) {
        return true;
      }
    }
    return false;
  }

  //Esta funcion nos servirá mas tarde para que un usuario pueda consultar sus datos 
  //(solo le devolveremos los datos que le correspondan a su documento (coleccion))
  getUserCookie() {
    let id = Number(this.loginService.getId());
    return this.users[id];
  }

  //Funcion que te devuelve el objetivo que tiene el id que le pasamos
  getGoal(id:number) {
    return this.goalsService.getGoal(id);
  }

  //Funcion que te devuelve todos los objetivos
  getGoals() {
    return this.goalsService.getGoals();
  }

  //Funcion que te devuelve el tipo de entrenamineto que tiene el id que le pasamos
  getTraining(id:number) {
    return this.trainingService.getTraining(id);
  }

  //Funcion que te devuelve todos los entrenamientos
  getTrainings() {
    return this.trainingService.getTrainings();
  }

  login(id:number){
    this.loginService.login(id);
  }

  logout() {
    this.loginService.logout();
  }

  isLogged() {
    return this.loginService.isLogged();
  }

  
}