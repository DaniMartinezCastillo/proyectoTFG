import { Injectable } from '@angular/core';
import { Communication } from '../interfaces/communication';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  communications: Communication[] = [];

  constructor(private firebaseService: FirebaseService) { }

  //Función que añade una comunicación entre componentes
  addCommunication(communication: Communication) {
    this.communications.push(communication);
    this.firebaseService.addCommunication(communication);
  }

  //Función que devuelve todas las comunicaciones de los usuarios
  getCommunications() {
    return this.communications;
  }

  //Función que añade las comunicaciones en el servidor
  setCommunications(communication: Communication[]) {
    this.communications = communication;
  }

  //Función que te devuelve el usuario que tiene el id que recibe
  getCommunication(idUser: string) {
    let _communication!: Communication;
    for (let communication of this.communications) {
      if (communication.idUser == idUser) {
        _communication = communication;
        break;
      }
    }
    return _communication;
  }

  //Función que modifica los datos de la comunicacion que recibe
  editCommunication(_communication: Communication) {
    for (let i = 0; i < this.communications.length; i++) {
      if (this.communications[i].idUser == _communication.idUser) {
        this.communications[i] = _communication;
        this.firebaseService.editCommunication(_communication);
        break;
      }
    }
  }
}
