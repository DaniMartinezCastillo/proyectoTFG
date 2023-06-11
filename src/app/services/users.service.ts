import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { LoginService } from './login.service';
import { GoalsService } from './goals.service';
import { TrainingsService } from './trainings.service';
import { FirebaseService } from './firebase.service';
import { RoutinesService } from './routines.service';
import { MuscleService } from './muscle.service';
import { ExerciseService } from './exercise.service';
import { Goal } from '../interfaces/goal';
import { Training } from '../interfaces/training';
import { Routine } from '../interfaces/routine';
import { Muscle } from '../interfaces/muscle';
import { Exercise } from '../interfaces/exercise';
import { Communication } from '../interfaces/communication';
import { CommunicationService } from './communication.service';



@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users: User[] = [];

  constructor(
    private loginService: LoginService,
    private goalsService: GoalsService,
    private trainingService: TrainingsService,
    private routineService: RoutinesService,
    private muscleService: MuscleService,
    private exerciseService: ExerciseService,
    private communicationService: CommunicationService,
    private firebaseService: FirebaseService
  ) {}


  //Función que añade un usuario
  addUser(user: User) {   
    this.users.push(user);
    this.firebaseService.addUser(user);
  }

  //Función que devuelve todos los usuarios
  getUsers(){
    return this.users;
  }

  //Función que añade los usuarios en el servidor
  setUsers(users: User[]){
    this.users = users;
  }

  //Función que te devuelve el usuario que tiene el id que recibe
  getUser(id: string){
    let _user!: User;
    for (let user of this.users) {
      if(user.id == id){
        _user = user;
        break;
      }
    }
    return _user;
  }

  //Función que modifica los datos del usuario que recibe
  editUser(user: User) {
    for (let i = 0; i < this.users.length; i++) {
      if(this.users[i].id == user.id){
        this.users[i] = user;
        this.firebaseService.editUser(user);
        break;
      }
    }
  }

  //Función que comprueba si el email que recibe ya existe
  emailExist(email: string) {
    email = email.toLowerCase();//pasa todo lo escrito a minúscula
    for (let user of this.users) {
      if (user.email == email) {
        return true;
      }
    }
    return false;
  }

  //Función que comprueba si el nombre de usuario que recibe ya existe
  userNameExist(userName: string) {
    userName = userName.toLowerCase();//pasa todo lo escrito a minúscula
    for (let user of this.users) {
      if (user.userName == userName) {
        return true;
      }
    }
    return false;
  }

  //Función que comprueba si el usuario con el email y el id que recibe ya existe
  userExist(user: User) {
    let email = user.email.toLowerCase();
    for (let user of this.users) {
      if (email == user.email && user.id != user.id) {
        return true;
      }
    }
    return false;
  }

  //Función que devuelve los datos del usuario que ha iniciado sesión (comprueba 
  //que usuario ha iniciado sesión por el id que hay en el token)
  getUserCookie() {
    let _user!: User; 
    let userName = this.loginService.getUserName();
    for (let user of this.users) {
      if(user.userName == userName){
        _user = user;
        break;
      }
    }
    return _user;
  }

  //Función que devuelve todos los objetivos que hay en la base de datos
  getGoals() {
    return this.goalsService.getGoals();
  }

  //Función que devuelve el objetivo que tiene el id que recibe
  getGoal(id:string) {
    return this.goalsService.getGoal(id);
  }

  //Función que añade los objetivos en el servidor
  setGoals(goals: Goal[]){
    this.goalsService.setGoals(goals)
  }

  //Función que devuelve todos los tipos de entrenamientos que hay en la base de datos
  getTrainings() {
    return this.trainingService.getTrainings();
  }

  //Función que devuelve el tipo de entrenamiento que tiene el id que recibe
  getTraining(id:string) {
    return this.trainingService.getTraining(id);
  }

  //Función que añade los tipos de entrenamiento en el servidor
  setTrainings(trainings: Training[]){
    this.trainingService.setTrainings(trainings);
  }

  //Función que devuelve el tipo de rutina que tiene los dias y el tipo de entrenamiento que recibe
  getRoutine(days:number, training:string) {
    return this.routineService.getRoutine(days, training);
  }

  //Función que devuelve todos los tipos de routinas que hay en la base de datos
  getRoutines() {
    return this.routineService.getRoutines();
  }

  //Función que añade las rutinas en el servidor
  setRoutines(routines: Routine[]){
    this.routineService.setRoutines(routines);
  }
  
  //Función que devuelve todos los entrenamientos para los musculos que hay
  getMuscles() {
    return this.muscleService.getMuscles();
  }

  //Función que devuelve el musculo que tiene que entrenar
  getMuscle(id: string) {
    return this.muscleService.getMuscle(id);
  }

  //Función que añade los músculos en el servidor
  setMuscles(muscles: Muscle[]){
    this.muscleService.setMuscles(muscles);
  }

  //Función que devuelve el ejercicio que tiene el id que se le pasa
  getExercise(id: string) {
    return this.exerciseService.getExercise(id);
  }

  //Función que devuelve todos los ejercicios que hay
  getExercisesTraining(exercises: Array<string>) {
    return this.exerciseService.getExercisesTraining(exercises);
  }

  //Función que devuelve todos los ejercicios que hay
  getExercises() {
    return this.exerciseService.getExercises();
  }

  //Función que añade los ejercicios en el servidor
  setExercises(exercises: Exercise[]){
    this.exerciseService.setExercises(exercises);
  }

  //Función que añade una comunicación más en el servidor
  addCommunication(communication: Communication){
    this.communicationService.addCommunication(communication);
  }

  //Función que devuelve todas las comunicaciones que hay
  getCommunications() {
    return this.communicationService.getCommunications();
  }

  //Función que añade las comunicaciones en el servidor
  setCommunications(communications: Communication[]){
    this.communicationService.setCommunications(communications);
  }

  //Función que te devuelve la comunicación del usuario que tiene el id que recibe
  getCommunication(idUser: string){
    return this.communicationService.getCommunication(idUser);
  }

  //Función que modifica los datos de la comunicacion que recibe
  editCommunication(communication: Communication) {
    this.communicationService.editCommunication(communication);
  }

  //Función con la que se iniciará sesión y se creará un token con el email del usuario que recibe
  login(userName:string){
    this.loginService.login(userName);
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