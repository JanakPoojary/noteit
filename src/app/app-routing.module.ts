import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NotecardComponent } from './notecard/notecard.component';
import { LoginGuard } from './login.guard';


const routes: Routes = [
  {path:'login',component: LoginComponent, children:[
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',component:HomeComponent},
    {path:'notecard',component:NotecardComponent,canActivate: [LoginGuard]}
  ]},
    {path: '', redirectTo:'login', pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
