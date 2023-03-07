import { Injectable, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService implements OnInit{

  constructor(
    private cookies:CookieService
  ) { }

  ngOnInit(): void { }

  // <-- cuando utilicemos una base de datos todas estas funciones se deberán cambiar -->

  login(id:string){
    this.cookies.set("id", id);

  }

  logout(){
    this.cookies.set("id","");
  }

  getId(){ 
    //Se devuelve como string, por lo que para usar el id habra que pasarlo a number
    return this.cookies.get("id");
  }

  isLogged(){
    let cookie = this.getId();
    if (cookie == undefined || cookie == ""){
      return false;
    }
    return true;
  }
}
