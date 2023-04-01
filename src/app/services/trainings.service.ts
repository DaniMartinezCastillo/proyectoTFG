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

  //Función que añade un tipo de entrenamiento
  addTraining(training: Training) {
    this.trainings.push(training);
  }

  //Función que devuelve todos los tipo de entrenamientos que hay en la base de datos
  getTrainings() {
    return this.trainings;
  }

  //Función que devuelve el tipo de entrenamiento que tiene el id que recibe
  getTraining(id: number) {
    return this.trainings[id];
  }
}
