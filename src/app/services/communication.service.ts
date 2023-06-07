import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  idMuscle!: string;
  routine!: Array<string>;

  constructor() { }

  setRoutine(idMuscle: string, muscleTraining: Array<string>){
    this.idMuscle = idMuscle;
    this.routine = muscleTraining;
  }

  getIdMuscle(){
    return this.idMuscle;
  }

  getRoutine(){
    return this.routine;
  }
}
