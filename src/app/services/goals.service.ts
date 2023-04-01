import { Injectable } from '@angular/core';
import { Goal } from '../interfaces/goal';

@Injectable({
  providedIn: 'root'
})
export class GoalsService {

  goals: Goal[] = [
    {
      id: 0,
      name: "Perder peso",
    },
    {
      id: 1,
      name: "Mantenerme en forma",
    },
    {
      id: 2,
      name: "Aumentar músculo",
    },
  ]

  constructor() { }

  //Función que añade un objetivo
  addGoal(goal: Goal) {
    this.goals.push(goal);
  }

  //Función que devuelve todos los objetivos que hay en la base de datos
  getGoals() {
    return this.goals;
  }

  //Función que devuelve el objetivo que tiene el id que recibe
  getGoal(id: number) {
    return this.goals[id];
  }
}
