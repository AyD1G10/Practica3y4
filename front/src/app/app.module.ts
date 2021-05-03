import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

import { UserService } from './services/user.service';

import { FormsModule } from '@angular/forms';
import {  HttpClientModule  } from '@angular/common/http';
import { AlquilerPeliculasComponent } from './components/alquiler-peliculas/alquiler-peliculas.component';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from "@angular/common";
import { MatInputModule} from '@angular/material/input';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { HistorialComponent } from './components/historial/historial.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AlquilerPeliculasComponent,
    RegistrarUsuarioComponent,
    CatalogoComponent,
    HistorialComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    CommonModule,
    BrowserAnimationsModule,
  ],
  providers: [DatePipe, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
