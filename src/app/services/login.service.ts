import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private router: Router,
    private cookies:CookieService
  ) { }

  //Función que crea el token y te lleva al portal al iniciar sesión
  login(userName:string){
    this.cookies.set("userName", userName); //La cookie solo utiliza parametros string
    this.router.navigate(['portal']);
  }

  //Función que elimina el token y te lleva a la página de login al cerrar sesión
  logout(){
    this.cookies.set("userName",""); //Vacía la cookie
    this.router.navigate([""]);
  }

  //Función que devuelve el nombre de usuario del usuario que habrá iniciado sesión
  getUserName(){ 
    //Se devuelve como string
    return this.cookies.get("userName");
  }

  //Función que comprobará si aún sigue la sesión iniciada y si ya se ha cerrado sesión 
  //te llevará a la página de login
  isLogged(){
    let cookie = this.getUserName();
    //Comprueba que la cookie está vacía
    if (cookie == undefined || cookie == "" ){
      this.router.navigate([""]);
      return false;
    }
    return true;
  }
}
