import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { HomeMosComponent } from './component/home-mos/home-mos.component';
import { TablesComponent } from './component/tables/tables.component';
import { HomeComponent } from './component/home/home.component';
import { LayoutComponent } from './component/layout/layout.component';
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);
const routes: Routes = [
{  path: '',
  pathMatch: 'full',
  component: LayoutComponent,
},
{
  path: 'login',
  component: LoginComponent,
  ...canActivate(redirectLoggedInToHome),
},
{
  path: 'register',
  component: RegisterComponent,
  ...canActivate(redirectLoggedInToHome),
},
{
  path: 'home',
  component: HomeComponent,
  ...canActivate(redirectUnauthorizedToLogin),
},
{
  path: 'profile',
  component: HomeMosComponent,
  ...canActivate(redirectUnauthorizedToLogin),
},
{path:'table',
component:TablesComponent,
...canActivate(redirectUnauthorizedToLogin),
},


//  {path: '' ,component: LoginComponent , pathMatch:'full'} ,
// {path:"register", component:RegisterComponent} ,
// {path:"login", component:LoginComponent},
// {path:"home", component:HomeComponent},
// {path:"home2", component:HomeMosComponent},

// {path:'table', component:TablesComponent},
// {path: 'layout', component:LayoutComponent}




]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
