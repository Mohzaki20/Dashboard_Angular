import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faTrashAlt,faEdit } from '@fortawesome/free-solid-svg-icons';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { HomeComponent } from 'src/app/component/home/home.component';
import { ChartsComponent } from './component/charts/charts.component';
import { environmentdevelopment } from 'src/environments/environment.development';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { TablesComponent } from './component/tables/tables.component';
import { HomeMosComponent } from './component/home-mos/home-mos.component';
import { LayoutComponent } from './component/layout/layout.component';
import { LoginComponent } from './component/login/login.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { RegisterComponent } from './component/register/register.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// import { initializeApp } from "firebase/app";
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { ToastrModule, provideToastr } from 'ngx-toastr';
import { ContactUsComponent } from './component/contact-us/contact-us.component';

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
    LayoutComponent,
    ContactUsComponent


  ],






  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
     provideFirebaseApp(() => initializeApp(environmentdevelopment.firebase)),
    AngularFireModule.initializeApp(environmentdevelopment.firebase),
    // SweetAlert2Module.forRoot(),
    // SweetAlert2Module,

    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule ,
    provideFirebaseApp(() => initializeApp(environmentdevelopment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    AngularFireModule.initializeApp(environmentdevelopment.firebase),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    BrowserAnimationsModule,
    AngularFirestoreModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    BrowserAnimationsModule
  ],
  providers: [
    provideAnimations(), // required animations providers
    provideToastr(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faTrashAlt);
    library.addIcons(faEdit);
  }
  }

