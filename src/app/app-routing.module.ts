import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { abort } from 'process';
import { AboutComponent } from './about/about.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  // {path:'',pathMatch:'full',redirectTo:'home'},
  // {path:'login', component:LoginComponent},
  // {path:'map', component:HomeComponent, canActivate:[AuthGuard]},

  {path:'', component:HomeComponent},
  {path:'about', component:AboutComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
