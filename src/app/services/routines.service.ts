import { Injectable } from '@angular/core';

import { FirebaseService } from './firebase.service';

import { Routine } from '../interfaces/routine';

@Injectable({
  providedIn: 'root'
})
export class RoutinesService {

  routines: Routine[] = []

  constructor(
    private firebaseService: FirebaseService
  ) {}

  //Función que devuelve todos los tipo de rutinas que hay en la base de datos
  getRoutines() {
    return this.routines;
  }

  //Función que devuelve el tipo de rutina que tiene los dias y el tipo de entrenamiento que recibe
  getRoutine(days: number, training: string) {
    let _routine!: Routine;
    for (let routine of this.routines) {
      if(routine.days == days && routine.training == training){
        _routine = routine;
        break;
      }
    }
    return _routine;
  }

  //Función que añade las rutinas en el servidor
  setRoutines(routines: Routine[]){
    this.routines = routines;
  }
}
