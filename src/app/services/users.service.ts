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

  users: User[] = [
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


  //Función que añade un usuario
  addUser(user: User) {
    this.users.push(user);
  }

  //Función que te devuelve los usuarios que hay en la base de datos
  getUsers() {
    return this.users;
  }

  //Función que te devuelve el usuario que tiene el id que recibe
  getUser(id: number) {
    return this.users[id];
  }

  //Función que modifica los datos del usuario que recibe
  editUser(user: User) {
    this.users[user.id] = user;
  }

  //Función que comprueba si el usuario con el email y el id que recibe ya existe
  userExist(email: string, id: number) {
    email = email.toLowerCase();
    for (let i = 0; i < this.users.length; i++) {
      if (email == this.users[i].email && id != this.users[i].id) {
        return true;
      }
    }
    return false;
  }

  //Función que devuelve los datos del usuario que ha iniciado sesión (comprueba 
  //que usuario ha iniciado sesión por el id que hay en el token)
  getUserCookie() {
    let id = Number(this.loginService.getId());
    return this.users[id];
  }

  //Función que devuelve el objetivo que tiene el id que recibe
  getGoal(id:number) {
    return this.goalsService.getGoal(id);
  }

  //Función que devuelve todos los objetivos que hay en la base de datos
  getGoals() {
    return this.goalsService.getGoals();
  }

  //Función que devuelve el tipo de entrenamiento que tiene el id que recibe
  getTraining(id:number) {
    return this.trainingService.getTraining(id);
  }

  //Función que devuelve todos los tipos de entrenamientos que hay en la base de datos
  getTrainings() {
    return this.trainingService.getTrainings();
  }

  //Función con la que se iniciará sesión y se creará un token con el id del usuario que recibe
  login(id:number){
    this.loginService.login(id);
  }

  //Función que cerrará la sesión
  logout() {
    this.loginService.logout();
  }

  //Función que comprobará si la sesión sigue iniciada
  isLogged() {
    return this.loginService.isLogged();
  }

  
}