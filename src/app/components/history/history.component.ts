import { Component } from '@angular/core';

import { UsersService } from 'src/app/services/users.service';
import { HistoryService } from 'src/app/services/history.service';
import { FirebaseService } from 'src/app/services/firebase.service';

import { User } from 'src/app/interfaces/user';
import { Communication } from 'src/app/interfaces/communication';
import { History } from 'src/app/interfaces/history';
import { Muscle } from 'src/app/interfaces/muscle';
import { Exercise } from 'src/app/interfaces/exercise';
import { Training } from 'src/app/interfaces/training';

import { Storage, ref, listAll, getDownloadURL } from '@angular/fire/storage';

import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  providers: [MessageService]
})
export class HistoryComponent {

  first = 0;

  rows = 10;

  user!: User;
  communication!: Communication;
  numPreviousPage: number = 0;

  historys!: History[];

  visible: boolean = false;
  muscleName: string = "";
  muscleImage: string = "";
  images!: string[];
  muscleExercises: Exercise[] = [];
  muscle!: Muscle;

  data: any;
  options: any;
  datosDonut: number[] = [0, 0, 0, 0, 0, 0, 0];
  datosGraphic: number[] = [0, 0];

  basicData: any;
  basicOptions: any;

  historyDelete!: History;

  constructor(
    private usersService: UsersService,
    private historyService: HistoryService,
    private firebaseService: FirebaseService,
    private storage: Storage,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.firebaseService.getUsers().subscribe((users: User[]) => {
      this.usersService.setUsers(users);

      //Datos del usuario que ha iniciado sesión
      this.user = this.usersService.getUserCookie();

      this.firebaseService.getTrainings().subscribe((trainings: Training[]) => {
        this.usersService.setTrainings(trainings);

        this.firebaseService.getMuscles().subscribe((muscles: Muscle[]) => {
          this.usersService.setMuscles(muscles);

          this.firebaseService.getExercises().subscribe((exercises: Exercise[]) => {
            this.usersService.setExercises(exercises);

            this.firebaseService.getCommunications().subscribe((communications: Communication[]) => {
              this.usersService.setCommunications(communications);
              if (this.user.id != undefined) {
                this.communication = this.usersService.getCommunication(this.user.id);
              }

              if (this.numPreviousPage != 4) {
                this.communication.numPage = 4;
                this.usersService.editCommunication(this.communication);
                this.numPreviousPage = 4;
              }

              this.firebaseService.getHistorys().subscribe((historys: History[]) => {
                this.historyService.setHistorys(historys);
                this.historys = this.historyService.getHistorysUser(this.user);

                this.datosDonut = [0, 0, 0, 0, 0, 0, 0];
                this.datosGraphic = [0, 0];

                for (let history of this.historys) {
                  if (history.id != undefined) {
                    history.nameMuscle = this.usersService.getMuscle(history.nameMuscle).name;
                    history.training = this.usersService.getTraining(history.training).name;
                  }

                  switch (history.nameMuscle) {
                    case 'Pecho':
                      this.datosDonut[0] += 1;
                      break;
                    case 'Espalda':
                      this.datosDonut[1] += 1;
                      break;
                    case 'Bíceps':
                      this.datosDonut[2] += 1;
                      break;
                    case 'Tríceps':
                      this.datosDonut[3] += 1;
                      break;
                    case 'Hombros':
                      this.datosDonut[4] += 1;
                      break;
                    case 'Piernas':
                      this.datosDonut[5] += 1;
                      break;
                    case 'Abdominales':
                      this.datosDonut[6] += 1;
                  }

                  switch (history.training) {
                    case 'Culturismo':
                      this.datosGraphic[0] += 1;
                      break;
                    case 'Calistenia':
                      this.datosGraphic[1] += 1;
                  }
                }

                const documentStyle = getComputedStyle(document.documentElement);
                const textColor = documentStyle.getPropertyValue('--text-color');
                const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
                const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

                this.data = {
                  labels: ['Pecho', 'Espalda', 'Bíceps', 'Tríceps', 'Hombros', 'Piernas', 'Abdominales'],
                  datasets: [
                    {
                      data: this.datosDonut,
                    }
                  ]
                };

                this.options = {
                  plugins: {
                    legend: {
                      labels: {
                        usePointStyle: true,
                        color: textColor
                      }
                    }
                  }
                };

                this.basicData = {
                  labels: ['Culturismo', 'Calistenia'],
                  datasets: [
                    {
                      label: 'Tipos de Entrenamientos Completados',
                      data: this.datosGraphic,
                      borderWidth: 1
                    }
                  ]
                };

                this.basicOptions = {
                  plugins: {
                    legend: {
                      labels: {
                        color: textColor
                      }
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        color: textColorSecondary
                      },
                      grid: {
                        color: surfaceBorder,
                        drawBorder: false
                      }
                    },
                    x: {
                      ticks: {
                        color: textColorSecondary
                      },
                      grid: {
                        color: surfaceBorder,
                        drawBorder: false
                      }
                    }
                  }
                };

              });
            });

          });
        });
      });
    });

  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.historys ? this.first === this.historys.length - this.rows : true;
  }

  isFirstPage(): boolean {
    return this.historys ? this.first === 0 : true;
  }

  modalMoreInformation(muscle: string, training: string) {
    this.muscleName = muscle;
    this.getMuscleImage(this.muscleName);
    let _training = this.usersService.getTrainingName(training).id;
    this.muscle = this.usersService.getMuscleTraining(this.muscleName, _training);
    this.muscleExercises = this.usersService.getExercisesTraining(this.muscle.exercises);
    this.visible = true;
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

  //Mensaje de confirmación
  showConfirm(history: History) {
    this.historyDelete = history;
    this.messageService.clear();
    this.messageService.add({ sticky: true, severity: 'warn', summary: '¿Estás seguro?', detail: 'Confirma para eliminar los datos' });
  }

  //Función que cierra el mensaje de confirmación
  clear() {
    this.historyDelete = {
      id: "",
      userName: "",
      nameMuscle: "",
      date: 0,
      training: ""
    };
    this.messageService.clear();
  }

  //Función que elimina los datos al aceptar el mensaje de confirmación
  deleteHistory() {
    let history = this.historyDelete;
    this.usersService.deleteHistory(history);
    this.historys = this.historyService.getHistorysUser(this.user);
    this.clear();
  }

  //Función que hará que no puedas entrar a la página si no has iniciado sesión
  isLogged() {
    return this.usersService.isLogged();
  }

}
