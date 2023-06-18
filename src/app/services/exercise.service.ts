import { Injectable } from '@angular/core';

import { FirebaseService } from './firebase.service';

import { Exercise } from '../interfaces/exercise';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  exercises: Exercise[] = []

  constructor(
    private firebaseService: FirebaseService
  ) {}

  //Función que devuelve todos los tipo de ejercicios que hay en la base de datos
  getExercises() {
    return this.exercises;
  }

  //Función que devuelve el tipo de ejercicio que tiene el id que recibe
  getExercise(id: string) {
    let _exercise!: Exercise;
    for (let exercise of this.exercises) {
      if(exercise.id == id){
        _exercise = exercise;
        break;
      }
    }
    return _exercise;
  }

  //Función que devuelve el tipo de ejercicio que tiene el id que recibe
  getExercisesTraining(exercises: Array<string>) {
    let exercisesTraining: Exercise[] = [];
    for (let idExercise of exercises) {
      exercisesTraining.push(this.getExercise(idExercise))
    }
    return exercisesTraining;
  }

  //Función que añade los ejercicios en el servidor
  setExercises(exercises: Exercise[]){
    this.exercises = exercises;
  }
}
