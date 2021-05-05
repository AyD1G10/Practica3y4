import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { DatePipe } from '@angular/common'
import { UserInterface } from '../models/user-inteface';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private datePipe: DatePipe, private router: Router) { 

  }

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  })

  Login(email:string, password:string) {
    const url = "http://localhost:3000/login";

    return this.http.post<any>(url,
      {
        "usuario":email,
        "password":password
      }
      , { headers: this.headers })
      .pipe(map(data => data));
  }

  registarUsuario(nombre: string,apellido: string, usuario:string , dpi:string , contrasena: string,correo:string,fecha_nacimiento: Date) {

    const url = "http://localhost:3000/RegistarUsuario"
    return this.http.post<any>(
      url,
      {
        
        "nombre": nombre,
        "apellido": apellido,
        "usuario":usuario,
        "dpi":dpi,
        "email":correo,
        "password":contrasena,
        "fecha_nacimiento":this.datePipe.transform(fecha_nacimiento, 'yyyy/MM/dd'),
    
      },
      { headers: this.headers }
    ).pipe(map(data => data));

  }

  setCurrentUser(user: UserInterface) {
    let user_string = JSON.stringify(user);
    localStorage.setItem('UsuarioLogueado', user_string);
  }
  //TODO: GET CURRENT USER
  getCurrentUser() {
    let userCurrent = localStorage.getItem('UsuarioLogueado');
    if (userCurrent) {
      let user_json = JSON.parse(userCurrent);
      return user_json;
    } else {
      return null;
    }
  }

  logout() {
    localStorage.removeItem("UsuarioLogueado");
    this.router.navigate(['/login']);
  }

  //---------------- ALQUILER DE PELICULAS --------------------
  alquiler_peliculas(){  
    var carrito = localStorage.getItem('carrito');
    if(carrito){
      var obj = JSON.parse(carrito);
      return obj;
    }else{
      return null;
    } 
  }

}

