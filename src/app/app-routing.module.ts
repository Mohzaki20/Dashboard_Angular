import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { HomeMosComponent } from './component/home-mos/home-mos.component';
import { TablesComponent } from './component/tables/tables.component';
import { HomeComponent } from './component/home/home.component';
import { LayoutComponent } from './component/layout/layout.component';

const routes: Routes = [
 {path: '' ,component: LoginComponent , pathMatch:'full'} ,
{path:"register", component:RegisterComponent} ,
{path:"login", component:LoginComponent},
{path:"home", component:HomeComponent},
{path:"home2", component:HomeMosComponent},

{path:'table', component:TablesComponent},
{path: 'layout', component:LayoutComponent}




]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
