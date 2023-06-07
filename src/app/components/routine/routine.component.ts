import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { UsersService } from 'src/app/services/users.service';
import { FirebaseService } from 'src/app/services/firebase.service';

import { Muscle } from 'src/app/interfaces/muscle';
import { Exercise } from 'src/app/interfaces/exercise'

import { CommunicationService } from 'src/app/services/communication.service';

import { MenuItem } from 'primeng/api';

import { Storage, ref, listAll, getDownloadURL } from '@angular/fire/storage';

@Component({
  selector: 'app-routine',
  templateUrl: './routine.component.html',
  styleUrls: ['./routine.component.css']
})
export class RoutineComponent {

  idMuscle!: string;
  muscle!: Muscle;
  idMuscles!: Array<string>;
  routine: Muscle[] = [];
  exercise!: Exercise;
  exercises: Exercise[] = [];
  names: string[] = [];
  series: number[] = [];
  repetitions: number[] = [];

  items!: MenuItem[];
  activeIndex: number = 0;
  numMuscles: number = 0;

  visible: boolean = false;
  images!: string[];
  img1!: string;
  img2!: string;
  nameExercise!: string;

  constructor(
    private usersService: UsersService,
    private firebaseService: FirebaseService,
    private storage: Storage,
    private communication: CommunicationService
  ) {}

  ngOnInit(){
    this.firebaseService.getMuscles().subscribe((muscles: Muscle[]) => {
      this.usersService.setMuscles(muscles);
      this.idMuscle = this.communication.getIdMuscle()
      this.muscle = this.usersService.getMuscle(this.idMuscle);
      this.idMuscles = this.communication.getRoutine();

      this.firebaseService.getExercises().subscribe((exercises: Exercise[]) => {
        this.usersService.setExercises(exercises);

        for(let i = 0; i < this.idMuscles.length; i++){
          this.routine.push(this.usersService.getMuscle(this.idMuscles[i]));
          
          if (this.muscle.id == this.idMuscles[i]){
            this.activeIndex = i;
            this.exercises = this.usersService.getExercisesTraining(this.routine[i].exercises);
            this.exercisesMuscle();
          }
        }

        this.numMuscles = this.routine.length;

        this.items = (this.addItem());
        
      });
    });
  }

  addItem(){
    let item = [];

    for(let i = 0; i < this.routine.length; i++){
      item.push({
        title: this.routine[i].name,
        label: this.routine[i].name,
        command: () => {
          this.muscle = this.routine[i];
          this.exercises = this.usersService.getExercisesTraining(this.routine[i].exercises);
          this.activeIndex = i;
          this.exercisesMuscle();
        },
      });
    }
    item.push({
      title: 'Información',
      label: 'Información',
      command: () => {
        this.activeIndex = this.routine.length;
      },
    });

    return item;
  }

  exercisesMuscle(){
    this.names = [];
    this.series = [];
    this.repetitions = [];

    for(let exercise of this.exercises){
      this.names.push(exercise.name);
      this.series.push(exercise.series);
      this.repetitions.push(exercise.repetitions);
    }
  }

  modalExercise(_muscle: Muscle, _exercise: Exercise){

    this.nameExercise = _exercise.name;
    
    this.getImages(_muscle.name, _exercise.name);

    this.visible = true;
  }

  getImages(muscle: string, exercise: string) {
    let reference = muscle + "/" + exercise;
    const imagesRef = ref(this.storage, reference);

    listAll(imagesRef)
      .then( async resp=>{
        this.images = [];
        for(let item of resp.items){
          const url = await getDownloadURL(item);
          this.images.push(url);
        }
        this.img1 = this.images[0];
        this.img2 = this.images[1];
      }).catch(error=>{
        console.log(error);
    });
  }
  
  //Función que hará que no puedas entrar a la página si no has iniciado sesión
  isLogged() {
    return this.usersService.isLogged();
  }
}
