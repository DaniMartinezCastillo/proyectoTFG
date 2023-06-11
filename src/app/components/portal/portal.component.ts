import { Component } from '@angular/core';

import { UsersService } from 'src/app/services/users.service';
import { FirebaseService } from 'src/app/services/firebase.service';

import { User } from 'src/app/interfaces/user';
import { Routine } from 'src/app/interfaces/routine';
import { Muscle } from 'src/app/interfaces/muscle';
import { Communication } from 'src/app/interfaces/communication';

import { MegaMenuItem, MenuItem } from 'primeng/api';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent {
  routine!: Routine;
  user!: User;
  muscle!: Muscle;
  items1: Array<any> = [];
  items2: Array<any> = [];
  items3: Array<any> = [];
  items4: Array<any> = [];
  items5: Array<any> = [];

  exist: boolean = false;
  communication!: Communication;
  communications!: Communication[];
  numPreviousPage: number = -1;

  visible: boolean = false;

  constructor(
    private usersService: UsersService,
    private firebaseService: FirebaseService,
  ) { }

  ngOnInit() {
    this.firebaseService.getUsers().subscribe((users: User[]) => {
      this.usersService.setUsers(users);
      this.user = this.usersService.getUserCookie();

      this.firebaseService.getRoutines().subscribe((routines: Routine[]) => {
        this.usersService.setRoutines(routines);
        this.routine = this.usersService.getRoutine(this.user.days, this.user.training);

        this.firebaseService.getMuscles().subscribe((muscles: Muscle[]) => {
          this.usersService.setMuscles(muscles);

          this.items1 = this.nameMuscleTraining(this.routine.monday);
          this.items2 = this.nameMuscleTraining(this.routine.tuesday);
          this.items3 = this.nameMuscleTraining(this.routine.wednesday);
          this.items4 = this.nameMuscleTraining(this.routine.thursday);
          this.items5 = this.nameMuscleTraining(this.routine.friday);

          this.firebaseService.getCommunications().subscribe((communications: Communication[]) => {
            this.communications = communications;
            this.usersService.setCommunications(communications);

            if (this.user.id != undefined) {
              for (let communication of this.communications) {
                if (communication.idUser == this.user.id) {
                  this.exist = true;
                  this.communication = this.usersService.getCommunication(this.user.id);
                  break;
                }
              }

              if (this.exist && this.numPreviousPage != 0) {
                this.communication.numPage = 0;
                this.usersService.editCommunication(this.communication);
                this.numPreviousPage = 0;
              }

              if (!this.exist) {
                this.communication = {
                  idUser: this.user.id,
                  idMuscle: "",
                  routine: [],
                  numPage: 0
                }
                this.usersService.addCommunication(this.communication);
              }
            }
          });
        });
      });
    });
  }

  nameMuscleTraining(routine: Array<string>) {
    let item = [];

    for (let muscle of routine) {
      if (muscle == "Descanso") {
        item.push(muscle);
      } else {
        this.muscle = this.usersService.getMuscle(muscle); //obtenemos el músculo pasándole el id
        let muscleIcon = "../../assets/icons/" + this.muscle.name + ".png"
        this.muscle.icon = muscleIcon;
        item.push(this.muscle);
      }
    }

    return item;
  }

  modalInfoDescanso() {
    this.visible = true;
  }

  setRoutine(muscle: Muscle, day: number) {
    switch (day) {
      case 1:
        this.communication.routine = this.routine.monday;
        break;
      case 2:
        this.communication.routine = this.routine.tuesday;
        break;
      case 3:
        this.communication.routine = this.routine.wednesday;
        break;
      case 4:
        this.communication.routine = this.routine.thursday;
        break;
      case 5:
        this.communication.routine = this.routine.friday;
    }

    this.communication.idMuscle = muscle.id;
    this.usersService.editCommunication(this.communication);
  }

  //Función que hará que no puedas entrar a la página si no has iniciado sesión
  isLogged() {
    return this.usersService.isLogged();
  }
}
