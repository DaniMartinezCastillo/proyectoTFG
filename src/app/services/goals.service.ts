import { Injectable } from '@angular/core';
import { Goal } from '../interfaces/goal';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class GoalsService {

  goals: Goal[] = [];

  constructor(
    private firebaseService: FirebaseService
  ) {}

  //Función que devuelve todos los objetivos que hay en la base de datos
  getGoals() {
    return this.goals;
  }

  //Función que devuelve el objetivo que tiene el id que recibe
  getGoal(id: string) {
    let _goal!: Goal;
    for (let goal of this.goals) {
      if(goal.id == id){
        _goal = goal;
        break;
      }
    }
    return _goal;
  }

  //Función que añade los objetivos en el servidor
  setGoals(goals: Goal[]){
    this.goals = goals;
  }
}
