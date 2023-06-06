import { Injectable } from '@angular/core';
import { Muscle } from '../interfaces/muscle';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class MuscleService {

  muscles: Muscle[] = []

  constructor(
    private firebaseService: FirebaseService
  ) {}

  //Función que devuelve todos los musculos que hay en la base de datos
  getMuscles() {
    return this.muscles;
  }

  //Función que devuelve el tipo de entrenamiento que tiene el id que recibe
  getMuscle(id: string) {
    let _muscle!: Muscle;
    for (let muscle of this.muscles) {
      if(muscle.id == id){
        _muscle = muscle;
        break;
      }
    }
    return _muscle;
  }

  //Función que añade los músculos en el servidor
  setMuscles(muscles: Muscle[]){
    this.muscles = muscles;
  }
}
