import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './components/login/login.component';
import { PortalComponent } from './components/portal/portal.component';
import { RegisterComponent } from './components/register/register.component';
import { MenubarComponent } from './components/menubar/menubar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { Error404Component } from './components/error404/error404.component';
import { RoutineComponent } from './components/routine/routine.component';
import { FooterComponent } from './components/footer/footer.component';

import { environment } from '../environments/environment';

import { UsersService } from './services/users.service'
import { CookieService } from 'ngx-cookie-service';

import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { ToastModule } from 'primeng/toast';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { StepsModule } from 'primeng/steps';
import { DialogModule } from 'primeng/dialog';

import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PortalComponent,
    RegisterComponent,
    MenubarComponent,
    ProfileComponent,
    EditProfileComponent,
    Error404Component,
    RoutineComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    DividerModule,
    ButtonModule,
    PasswordModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule,
    CardModule,
    ImageModule,
    ToastModule,
    MenubarModule,
    MenuModule,
    StepsModule,
    DialogModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ],
  providers: [UsersService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
