import { Component } from '@angular/core';

import { UsersService } from 'src/app/services/users.service';
import { FirebaseService } from 'src/app/services/firebase.service';

import { User } from 'src/app/interfaces/user';
import { Goal } from 'src/app/interfaces/goal';
import { Training } from 'src/app/interfaces/training';
import { Communication } from 'src/app/interfaces/communication';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  user!: User;
  goal!: Goal;
  training!: Training;
  communication!: Communication;
  numPreviousPage: number = 0;

  constructor(
    private usersService: UsersService,
    private firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    this.firebaseService.getUsers().subscribe((users: User[]) => {
      this.usersService.setUsers(users);
      //Datos del usuario que ha iniciado sesión
      this.user = this.usersService.getUserCookie();

      this.firebaseService.getGoals().subscribe((goals: Goal[]) => {
        this.usersService.setGoals(goals);
        this.goal = this.usersService.getGoal(this.user.goal);

        this.firebaseService.getTrainings().subscribe((trainings: Training[]) => {
          this.usersService.setTrainings(trainings);
          this.training = this.usersService.getTraining(this.user.training);

          this.firebaseService.getCommunications().subscribe((communications: Communication[]) => {
            this.usersService.setCommunications(communications);
            if(this.user.id != undefined){
              this.communication = this.usersService.getCommunication(this.user.id);
            }

            if(this.numPreviousPage != 2){
              this.communication.numPage = 2;
              this.usersService.editCommunication(this.communication);
              this.numPreviousPage = 2;
            }
          });
        });
      });
    });
  }

  //Función que hará que no puedas entrar a la página si no has iniciado sesión
  isLogged() {
    return this.usersService.isLogged();
  }
}
