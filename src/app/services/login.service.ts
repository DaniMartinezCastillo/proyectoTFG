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
  login(id:number){
    this.cookies.set("id", id.toString()); //La cookie solo utiliza parametros string
    this.router.navigate(['portal']);
  }

  //Función que elimina el token y te lleva a la página de login al cerrar sesión
  logout(){
    this.cookies.set("id",""); //Vacía la cookie
    this.router.navigate([""]);
  }

  //Función que devuelve el id del usuario que habrá iniciado sesión
  getId(){ 
    //Se devuelve como string, por lo que para usar el id habra que pasarlo a number
    return this.cookies.get("id");
  }

  //Función que comprobará si aún sigue la sesión iniciada y si ya se ha cerrado sesión 
  //te llevará a la página de login
  isLogged(){
    let cookie = this.getId();
    //Comprueba que la cookie está vacía
    if (cookie == undefined || cookie == ""){
      this.router.navigate([""]);
      return false;
    }
    return true;
  }
}
