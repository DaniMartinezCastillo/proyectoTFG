import { Injectable } from '@angular/core';
import { Training } from '../interfaces/training';

@Injectable({
  providedIn: 'root'
})
export class TrainingsService {

  trainings: Training[] = [
    {
      id: 0,
      name: "Calistenia",
    },
    {
      id: 1,
      name: "Pesas",
    },
  ]

  constructor() { }

  //Funcion que añade un usuario
  addTraining(training: Training) {
    this.trainings.push(training);
  }

  //Función que te devuelve los usuarios
  getTrainings() {
    return this.trainings;
  }

  //Funcion que te devuelve el usuario que tiene el id que le pasamos
  getTraining(id: number) {
    return this.trainings[id];
  }
}
