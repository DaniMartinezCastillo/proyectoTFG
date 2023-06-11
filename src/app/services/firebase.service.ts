import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, addDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { Training } from '../interfaces/training';
import { Goal } from '../interfaces/goal';
import { Routine } from '../interfaces/routine';
import { Muscle } from '../interfaces/muscle';
import { Exercise } from '../interfaces/exercise';
import { Communication } from '../interfaces/communication';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private firestore: Firestore,
  ) { }

  addUser(user: User){
    addDoc(collection(this.firestore, 'user'),user);
  }

  editUser(user: User){
    if(user.id != undefined){
      updateDoc(doc(this.firestore, 'user', user.id),{
        username: user.userName,
        name: user.name,
        surname: user.surname,
        email: user.email,
        password: user.password,
        age: user.age,
        weight: user.weight,
        genre: user.genre,
        height: user.height,
        days: user.days,
        weightObjective: user.weightObjective,
        goal: user.goal,
        training: user.training
      });
    }
  }

  getUsers(): Observable<User[]>{
    const userRef = collection(this.firestore, 'user');
    return collectionData(userRef, {idField: 'id'}) as Observable<User[]>;
  }

  getTrainings(): Observable<Training[]>{
    const trainingRef = collection(this.firestore, 'training');
    return collectionData(trainingRef, {idField: 'id'}) as Observable<Training[]>;
  }

  getGoals(): Observable<Goal[]>{
    const goalRef = collection(this.firestore, 'goal');
    return collectionData(goalRef, {idField: 'id'}) as Observable<Goal[]>;
  }

  getRoutines(): Observable<Routine[]>{
    const routineRef = collection(this.firestore, 'routine');
    return collectionData(routineRef, {idField: 'id'}) as Observable<Routine[]>;
  }

  getMuscles(): Observable<Muscle[]>{
    const muscleRef = collection(this.firestore, 'muscleTraining');
    return collectionData(muscleRef, {idField: 'id'}) as Observable<Muscle[]>;
  }

  getExercises(): Observable<Exercise[]>{
    const exerciseRef = collection(this.firestore, 'exercise');
    return collectionData(exerciseRef, {idField: 'id'}) as Observable<Exercise[]>;
  }

  addCommunication(communication: Communication){
    addDoc(collection(this.firestore, 'communication'),communication);
  }

  editCommunication(communication: Communication){
    if(communication.id != undefined){
      updateDoc(doc(this.firestore, 'communication', communication.id),{
        idUser: communication.idUser,
        idMuscle: communication.idMuscle,
        routine: communication.routine,
        numPage: communication.numPage
      });
    }
  }

  getCommunications(): Observable<Communication[]>{
    const communicationRef = collection(this.firestore, 'communication');
    return collectionData(communicationRef, {idField: 'id'}) as Observable<Communication[]>;
  }
}
