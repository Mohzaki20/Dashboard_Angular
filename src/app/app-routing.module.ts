import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { HomeMosComponent } from './component/home-mos/home-mos.component';
const routes: Routes = [
 {path: '' ,component: LoginComponent , pathMatch:'full'} ,
{path:"register", component:RegisterComponent} ,
{path:"login", component:LoginComponent},
{path:"home", component:HomeMosComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
