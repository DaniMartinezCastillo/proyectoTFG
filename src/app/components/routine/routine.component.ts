import { Component } from '@angular/core';

import { UsersService } from 'src/app/services/users.service';
import { FirebaseService } from 'src/app/services/firebase.service';

import { Muscle } from 'src/app/interfaces/muscle';
import { Exercise } from 'src/app/interfaces/exercise'
import { Communication } from 'src/app/interfaces/communication';
import { User } from 'src/app/interfaces/user';

import { MenuItem } from 'primeng/api';

import { Storage, ref, listAll, getDownloadURL } from '@angular/fire/storage';

@Component({
  selector: 'app-routine',
  templateUrl: './routine.component.html',
  styleUrls: ['./routine.component.css']
})
export class RoutineComponent {

  muscleImage!: string;

  user!: User;
  idMuscle!: string;
  muscle!: Muscle;
  idMuscles!: Array<string>;
  routine: Muscle[] = [];
  exercise!: Exercise;
  exercises: Exercise[] = [];
  names: string[] = [];
  series: number[] = [];
  repetitions: number[] = [];

  communication!: Communication;
  numPreviousPage: number = 0;

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
    private storage: Storage
  ) {

    this.firebaseService.getMuscles().subscribe((muscles: Muscle[]) => {
      this.usersService.setMuscles(muscles);

      this.firebaseService.getCommunications().subscribe((communications: Communication[]) => {
        this.usersService.setCommunications(communications);
        this.user = this.usersService.getUserCookie();

        this.firebaseService.getExercises().subscribe((exercises: Exercise[]) => {
          this.usersService.setExercises(exercises);
          if (this.user.id != undefined) {
            this.communication = this.usersService.getCommunication(this.user.id);
          }

          if (this.numPreviousPage != 1){
            this.communication.numPage = 1;
            this.usersService.editCommunication(this.communication);
            this.numPreviousPage = 1;
          }
          
          this.idMuscle = this.communication.idMuscle;
          this.muscle = this.usersService.getMuscle(this.idMuscle);
          this.idMuscles = this.communication.routine;

          for (let i = 0; i < this.idMuscles.length && this.routine.length < this.idMuscles.length; i++) {
            this.routine.push(this.usersService.getMuscle(this.idMuscles[i]));

            if (this.muscle.id == this.idMuscles[i]) {
              this.activeIndex = i;
              this.exercises = this.usersService.getExercisesTraining(this.routine[i].exercises);
              this.exercisesMuscle();
              this.getMuscleImage(this.muscle.name);
            }
          }

          this.numMuscles = this.routine.length;

          this.items = (this.addItem());
        });
      });
    });
  }

  ngOnInit() {

  }

  addItem() {
    let item = [];

    for (let i = 0; i < this.routine.length; i++) {
      item.push({
        title: this.routine[i].name,
        label: this.routine[i].name,
        command: () => {
          this.muscle = this.routine[i];
          this.exercises = this.usersService.getExercisesTraining(this.routine[i].exercises);
          this.activeIndex = i;
          this.exercisesMuscle();
          this.getMuscleImage(this.muscle.name);
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

  getMuscleImage(muscle: string) {
    let reference = muscle + "/Músculo/";
    const imagesRef = ref(this.storage, reference);
    this.muscleImage = "";

    listAll(imagesRef)
      .then(async resp => {
        this.images = [];
        for (let item of resp.items) {
          const url = await getDownloadURL(item);
          this.images.push(url);
        }
        this.muscleImage = this.images[0];
      }).catch(error => {
        console.log(error);
      });
  }

  exercisesMuscle() {
    this.names = [];
    this.series = [];
    this.repetitions = [];

    for (let exercise of this.exercises) {
      this.names.push(exercise.name);
      this.series.push(exercise.series);
      this.repetitions.push(exercise.repetitions);
    }
  }

  modalExercise(_muscle: Muscle, _exercise: Exercise) {

    this.nameExercise = _exercise.name;

    this.getImages(_muscle.name, _exercise.name);

    this.visible = true;
  }

  getImages(muscle: string, exercise: string) {
    let reference = muscle + "/" + exercise;
    const imagesRef = ref(this.storage, reference);
    this.img1 = "";
    this.img2 = "";

    listAll(imagesRef)
      .then(async resp => {
        this.images = [];
        for (let item of resp.items) {
          const url = await getDownloadURL(item);
          this.images.push(url);
        }
        this.img1 = this.images[0];
        this.img2 = this.images[1];
      }).catch(error => {
        console.log(error);
      });
  }

  //Función que hará que no puedas entrar a la página si no has iniciado sesión
  isLogged() {
    return this.usersService.isLogged();
  }
}
