import { NgModule } from '@angular/core';
import { AngularFireModule } from "@angular/fire/compat";
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
import { TablesComponent } from './component/tables/tables.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faTrashAlt,faEdit } from '@fortawesome/free-solid-svg-icons';
// import { initializeApp } from "firebase/app";
import { environment } from '../environments/environment';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './component/register/register.component';
// import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
// import { environment } from '../environments/environment';
// import { provideAuth,getAuth } from '@angular/fire/auth';
// import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { HomeMosComponent } from './component/home-mos/home-mos.component';

// import { AngularFireModule } from '@angular/fire/compat';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ChartsComponent } from 'src/components/charts/charts.component';

import { provideDatabase,getDatabase } from '@angular/fire/database';
import { NavbarComponent } from 'src/components/navbar/navbar.component';
import { SidebarComponent } from 'src/components/sidebar/sidebar.component';
import { HomeComponent } from 'src/components/home/home.component';



@NgModule({
  declarations: [
    AppComponent,
    TablesComponent,
    LoginComponent,
    RegisterComponent,
    HomeMosComponent,

    ChartsComponent,
    NavbarComponent,
    SidebarComponent,
    HomeComponent


  ],



  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    // provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),
    SweetAlert2Module.forRoot(),
    SweetAlert2Module,
    // provideAuth(() => getAuth()),
    // provideFirestore(() => getFirestore()),
    // AngularFireModule.initializeApp(environment.firebase),
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    // FontAwesomeModule,
    ReactiveFormsModule ,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    // AngularFirestoreModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary){
    library.addIcons(faTrashAlt);
    library.addIcons(faEdit);
  }
  }
