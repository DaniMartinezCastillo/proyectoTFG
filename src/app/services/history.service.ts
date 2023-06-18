import { Injectable } from '@angular/core';

import { FirebaseService } from './firebase.service';

import { User } from '../interfaces/user';
import { History } from '../interfaces/history';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  historys: History[] = [];

  constructor(private firebaseService: FirebaseService) { }

  //Función que añade un registro de entrenamiento
  addHistory(history: History) {
    this.historys.push(history);
    this.firebaseService.addHistory(history);
  }

  //Función que devuelve todos los registros de entrenamiento
  getHistorys(){
    return this.historys;
  }

  //Función que devuelve todos los registros de entrenamientos que ha realizado un usuario
  getHistorysUser(user: User){
    let historysUser: History[] = []
    for (let history of this.historys){
      if(history.userName == user.userName){
        historysUser.push(history);
      }
    }

    return historysUser;
  }

  //Función que añade los registtros de entrenamienros en el servidor
  setHistorys(historys: History[]) {
    this.historys = historys;
  }

  //Función para eliminar un registro de entrenamiento en el servidor
  async deleteHistory(_history: History){
    const response = await this.firebaseService.deleteHistory(_history);
    this.historys.filter((history) => history.id == _history.id);
  }
}
