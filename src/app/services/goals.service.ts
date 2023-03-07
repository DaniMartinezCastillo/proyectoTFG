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

  //Funcion que añade un usuario
  addGoal(goal: Goal) {
    this.goals.push(goal);
  }

  //Función que te devuelve los usuarios
  getGoals() {
    return this.goals;
  }

  //Funcion que te devuelve el usuario que tiene el id que le pasamos
  getGoal(id: number) {
    return this.goals[id];
  }
}
