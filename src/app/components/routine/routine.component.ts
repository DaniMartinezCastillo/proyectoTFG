import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { UsersService } from 'src/app/services/users.service';
import { FirebaseService } from 'src/app/services/firebase.service';

import { Muscle } from 'src/app/interfaces/muscle';
import { Exercise } from 'src/app/interfaces/exercise'

import { InfoTrainingComponent } from '../info-training/info-training.component';
import { ExerciseComponent } from '../exercise/exercise.component';

@Component({
  selector: 'app-routine',
  templateUrl: './routine.component.html',
  styleUrls: ['./routine.component.css']
})
export class RoutineComponent {

  muscle!: Muscle;
  exercise!: Exercise;
  exercises: Exercise[] = [];
  names: string[] = [];
  series: number[] = [];
  repetitions: number[] = [];

  constructor(
    private usersService: UsersService,
    private firebaseService: FirebaseService,
    private dialog: MatDialog
  ) {}

  ngOnInit(){
    this.firebaseService.getMuscles().subscribe((muscles: Muscle[]) => {
      this.usersService.setMuscles(muscles);
      this.muscle = this.usersService.getMuscleCookie();

      this.firebaseService.getExercises().subscribe((exercises: Exercise[]) => {
        this.usersService.setExercises(exercises);
        this.exercises = this.usersService.getExercisesTraining(this.muscle.exercises);

        for(let exercise of this.exercises){
          this.names.push(exercise.name);
          this.series.push(exercise.series);
          this.repetitions.push(exercise.repetitions);
        }
      });
    });
  }

  modalExercise(_muscle: Muscle, _exercise: Exercise){
    this.dialog.open(ExerciseComponent, {
      data: {
        muscle: _muscle,
        exercise: _exercise
      },
    });
  }

  modalInfoTraining(){
    this.dialog.open(InfoTrainingComponent);
  }
  
  //Función que hará que no puedas entrar a la página si no has iniciado sesión
  isLogged() {
    return this.usersService.isLogged();
  }
}
