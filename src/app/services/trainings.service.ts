import { Injectable } from '@angular/core';
import { Training } from '../interfaces/training';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class TrainingsService {

  trainings: Training[] = []

  constructor(
    private firebaseService: FirebaseService
  ) {}

  //Función que devuelve todos los tipo de entrenamientos que hay en la base de datos
  getTrainings() {
    return this.trainings;
  }

  //Función que devuelve el tipo de entrenamiento que tiene el id que recibe
  getTraining(id: string) {
    let _training!: Training;
    for (let training of this.trainings) {
      if(training.id == id){
        _training = training;
        break;
      }
    }
    return _training;
  }

  //Función que añade los tipos de entrenamiento en el servidor
  setTrainings(trainings: Training[]){
    this.trainings = trainings;
  }
}
