import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChartsComponent } from 'src/components/charts/charts.component';


import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { HomeMosComponent } from './component/home-mos/home-mos.component';
import { TablesComponent } from './component/tables/tables.component';
const routes: Routes = [
 {path: '' ,component: LoginComponent , pathMatch:'full'} ,
{path:"register", component:RegisterComponent} ,
{path:"login", component:LoginComponent},
{path:"home", component:HomeMosComponent},
{path:'table', component:TablesComponent},
{path: 'charts', component:ChartsComponent}



]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
