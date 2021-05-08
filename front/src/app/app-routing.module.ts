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
import { CatalogoAdminComponent } from './components/catalogo-admin/catalogo-admin.component'

const routes: Routes = [
  {
    path: 'login',
    component:LoginComponent
   
  },
  {
    path: 'pagoalquiler',
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
  },
  {
    path: 'catalogoAdmin',
    component:CatalogoAdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
