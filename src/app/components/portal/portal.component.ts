import { Component } from '@angular/core';

import { UsersService } from 'src/app/services/users.service';
import { FirebaseService } from 'src/app/services/firebase.service';

import { User } from 'src/app/interfaces/user';
import { Routine } from 'src/app/interfaces/routine';
import { Muscle } from 'src/app/interfaces/muscle';

import { MenuItem } from 'primeng/api';

import { CommunicationService } from 'src/app/services/communication.service';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent {
  routine!: Routine;
  user!: User;
  muscle!: Muscle;
  items1!: MenuItem[];
  items2!: MenuItem[];
  items3!: MenuItem[];
  items4!: MenuItem[];
  items5!: MenuItem[];

  visible: boolean = false;

  constructor(
    private usersService: UsersService,
    private firebaseService: FirebaseService,
    private communication: CommunicationService
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
        });
      });
    });
  }

  nameMuscleTraining(routine: Array<string>) {
    let item = [];
    for (let muscle of routine) {
      if (muscle == "Descanso") {
        item.push({
          title: muscle,
          label: muscle,
          icon: 'pi pi-info-circle',
          command: () => {
            this.modalInfoDescanso();
          },
        });
      } else {
        this.muscle = this.usersService.getMuscle(muscle);
        item.push({
          title: this.muscle.name,
          label: this.muscle.name,
          icon: 'pi pi-info-circle',
          command: () => {
            this.setRoutine(muscle, routine);
          },
          routerLink: '/routine'
        });
      }
    }
    return item;
  }

  modalInfoDescanso(){
    this.visible = true;
  }

  setRoutine(id: string, muscleTraining: Array<string>) {
    this.communication.setRoutine(id, muscleTraining);

  }

  //Función que hará que no puedas entrar a la página si no has iniciado sesión
  isLogged() {
    return this.usersService.isLogged();
  }
}
