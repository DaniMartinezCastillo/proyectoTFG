import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService implements OnInit{

  constructor(
    private router: Router,
    private cookies:CookieService
  ) { }

  ngOnInit(): void { }

  // <-- cuando utilicemos una base de datos todas estas funciones se deberán cambiar -->

  login(id:number){
    this.cookies.set("id", id.toString()); //La cookie solo utiliza parametros string
    this.router.navigate(['portal']);
  }

  logout(){
    this.cookies.set("id","");
    this.router.navigate([""]);
  }

  getId(){ 
    //Se devuelve como string, por lo que para usar el id habra que pasarlo a number
    return this.cookies.get("id");
  }

  isLogged(){
    let cookie = this.getId();
    if (cookie == undefined || cookie == ""){
      this.router.navigate([""]);
      return false;
    }
    return true;
  }
}
