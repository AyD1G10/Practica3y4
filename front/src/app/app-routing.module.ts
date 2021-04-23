import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from  "./components/login/login.component";
import { AlquilerPeliculasComponent } from './components/alquiler-peliculas/alquiler-peliculas.component';
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
  {
    path: 'login',
    component:LoginComponent
   
  },
  {
    path: '',
    component:AlquilerPeliculasComponent,
    canActivate:[AuthGuard]

  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
