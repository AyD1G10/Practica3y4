import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from  "./components/login/login.component";
import { AlquilerPeliculasComponent } from './components/alquiler-peliculas/alquiler-peliculas.component';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component'
import {HistorialComponent} from './components/historial/historial.component'
import { AuthGuard } from "./guards/auth.guard";
import {HistorialAdminComponent} from "./components/historial-admin/historial-admin.component"
import { DetallePeliculaComponent } from './components/detalle-pelicula/detalle-pelicula.component';
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
    path: 'catalogo',
    component:CatalogoComponent
   
  },
  {
    path: 'historial',
    component:HistorialComponent
   
  },
  {
    path:'historialAdmin',
    component:HistorialAdminComponent
  },
  {
    path: 'detalleProducto/:id',
    component:DetallePeliculaComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
