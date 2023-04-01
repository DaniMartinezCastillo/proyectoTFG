import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { PortalComponent } from './components/portal/portal.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { Error404Component } from './components/error404/error404.component';

//Rutas posibles
@NgModule({
  imports: [RouterModule.forRoot([
    { path: '', component: LoginComponent },
    { path: 'portal', component: PortalComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'editProfile', component: EditProfileComponent },

    //Cualquier ruta que no esté escrita anteriormente nos llevará a esta página (función de **)
    { path: '**', component: Error404Component }
  ]),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
