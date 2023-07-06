import { NgModule } from '@angular/core';
import { AngularFireModule } from "@angular/fire/compat";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TablesComponent } from './component/tables/tables.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faTrashAlt,faEdit } from '@fortawesome/free-solid-svg-icons';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './component/register/register.component';
import { HomeMosComponent } from './component/home-mos/home-mos.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { HomeComponent } from 'src/app/component/home/home.component';
import { ChartsComponent } from './component/charts/charts.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { environmentdevelopment } from 'src/environments/environment.development';
import { LayoutComponent } from './component/layout/layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';


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
    HomeComponent,
    LayoutComponent


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
    AngularFireModule.initializeApp(environmentdevelopment.firebase),
    SweetAlert2Module.forRoot(),
    SweetAlert2Module,

    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule ,

    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environmentdevelopment.firebase),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    BrowserAnimationsModule,

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
