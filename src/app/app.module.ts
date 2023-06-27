import { NgModule } from '@angular/core';
import { AngularFireModule } from "@angular/fire/compat";
import { BrowserModule } from '@angular/platform-browser';
import { ChartsComponent } from 'src/components/charts/charts.component';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { NavbarComponent } from 'src/components/navbar/navbar.component';
import { SidebarComponent } from 'src/components/sidebar/sidebar.component';
import { HomeComponent } from 'src/components/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    ChartsComponent,
    NavbarComponent,
    SidebarComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
export class AppModule { }
