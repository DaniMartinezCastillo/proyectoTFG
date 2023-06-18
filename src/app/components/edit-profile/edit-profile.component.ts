import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService } from 'src/app/services/users.service';
import { FirebaseService } from 'src/app/services/firebase.service';

import { User } from 'src/app/interfaces/user';
import { Goal } from 'src/app/interfaces/goal';
import { Training } from 'src/app/interfaces/training';
import { Communication } from 'src/app/interfaces/communication';

import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
  providers: [MessageService]
})
export class EditProfileComponent {

  submitted!: boolean;

  users!: User[];
  genres!: string[];
  goals!: Goal[];
  trainings!: Training[];

  user!: User;

  passwordSecure!: string;
  goal!: Goal;
  training!: Training;
  communication!: Communication;
  numPreviousPage: number = 0;


  constructor(
    private router: Router,
    private usersService: UsersService,
    private firebaseService: FirebaseService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    //Datos del usuario que ha iniciado sesión
    this.firebaseService.getUsers().subscribe((users: User[]) => {
      this.users = users;
      this.usersService.setUsers(this.users);
      this.user = this.usersService.getUserCookie();
      this.passwordSecure = this.user.password;

      this.firebaseService.getGoals().subscribe((goals: Goal[]) => {
        this.usersService.setGoals(goals);
        this.goals = this.usersService.getGoals();
        this.goal = this.usersService.getGoal(this.user.goal);

        this.firebaseService.getTrainings().subscribe((trainings: Training[]) => {
          this.usersService.setTrainings(trainings);
          this.trainings = this.usersService.getTrainings();
          this.training = this.usersService.getTraining(this.user.training);

          this.firebaseService.getCommunications().subscribe((communications: Communication[]) => {
            this.usersService.setCommunications(communications);
            if(this.user.id != undefined){
              this.communication = this.usersService.getCommunication(this.user.id);
            }

            if (this.numPreviousPage != 3){
              this.communication.numPage = 3;
              this.usersService.editCommunication(this.communication);
              this.numPreviousPage = 3;
            }
          });
        });
      });
    });

    this.genres = ["Hombre", "Mujer"];
    this.submitted = false;
  }

  edit() {
    //Comprobar que ningún campo esté vacío
    if (
      (this.user.email == null || this.user.email == '') ||
      (this.user.name == null || this.user.name == '') ||
      (this.user.surname == null || this.user.surname == '') ||
      (this.user.password == null || this.user.password == '') ||
      (this.passwordSecure != this.user.password) ||
      this.user.age == null ||
      this.user.weight == null ||
      this.user.height == null ||
      this.user.genre == null ||
      this.user.days == null ||
      this.goal == null ||
      this.user.weightObjective == null ||
      this.training == null
    ) {
      this.submitted = true;
    } else {
      //Comprobar que no existe ningún usuario con el email que ha puesto
      if (!this.userExist()) {
        this.user.email = this.user.email.toLowerCase();
        this.showConfirm();//Confirmar la edición
      }
    }
  }

  //Comprobar que no existe ningún usuario con el email que ha puesto
  userExist() {
    return this.usersService.userExist(this.user);
  }

  //Mensaje de confirmación
  showConfirm() {
    this.messageService.clear();
    this.messageService.add({ sticky: true, severity: 'warn', summary: '¿Estás seguro?', detail: 'Confirma para guardar los datos' });
  }

  //Función que guarda los datos al aceptar el mensaje de confirmación
  save() {
    this.messageService.clear();

    this.user.goal = this.goal.id;
    this.user.training = this.training.id;

    this.usersService.editUser(this.user);

    this.router.navigate(['profile']);
  }

  //Función que cierra el mensaje de confirmación
  clear() {
    this.messageService.clear();
  }

  //Función que hará que no puedas entrar a la página si no has iniciado sesión
  isLogged() {
    return this.usersService.isLogged();
  }
}
