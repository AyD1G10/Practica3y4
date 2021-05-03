import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from  "./components/login/login.component";
import { AlquilerPeliculasComponent } from './components/alquiler-peliculas/alquiler-peliculas.component';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component'
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

  },
  {
    path: 'RegistrarUsuario',
    component:RegistrarUsuarioComponent
   
  },
  {
    path: 'Catalogo',
    component:CatalogoComponent
   
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
