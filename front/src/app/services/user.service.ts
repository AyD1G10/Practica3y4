import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";

import { UserInterface } from '../models/user-inteface';
import { Router } from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) { 

  }

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  })

  Login(email:string, password:string) {
    const url = "http://localhost:3000/Login";

    return this.http.post<any>(url,
      {
        "usuario":email,
        "password":password
      }
      , { headers: this.headers })
      .pipe(map(data => data));
  }

  registarUsuario(nombre: string,apellido: string, usuario:string , dpi:string , contrasena: string,correo:string,age:string,creditCard:string,type:string) {

    const url = "http://localhost:3000/SignUp"
    return this.http.post<any>(
      url,
      {
        
        "name": nombre,
        "lastname": apellido,
        "username":usuario,
        "dpi":dpi,
        "email":correo,
        "password":contrasena,
        "age":age,
        "creditCard":creditCard,
        "type":type
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

  getCatalogo() {

    const url = "http://localhost:3000/catalogo";

    return this.http.post<any>(url,
      {
        
      }
      , { headers: this.headers })
      .pipe(map(data => data));
  }

  getHistorial() {
    const url = "http://localhost:3000/record"
    //const userId = localStorage.getItem('userId') || "608f3a56229dcb1684a79766";
    let userId = JSON.parse(localStorage.getItem('UsuarioLogueado')||'{}');
    userId = userId._id;
    /*const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      }),
      body:{userId:userId}
    };*/

    return this.http.post<any>(url,{userId:userId})
      .pipe(map(data => {console.log(data); return data}));

  }

  getHistorialAdmin() {
    const url = "http://localhost:3000/adminRecord"
    
    
    return this.http.post<any>(url,{})
      .pipe(map(data => {console.log(data); return data}));

  }

  getDetallesPelicula(id:string){
    const url = "http://localhost:3000/detallesPelicula"
    return this.http.post<any>(
      url,
      {
        "id": id,
        
      },
      { headers: this.headers }
    ).pipe(map(data => data));
  }

  getCatalogoAdmin() {

    const url = "http://localhost:3000/catalogoadmin";

    return this.http.post<any>(url,
      {
        
      }
      , { headers: this.headers })
      .pipe(map(data => data));
  }

  getPlanesPelicula(availabilities:any){
    const url = "http://localhost:3000/planes"
    return this.http.post<any>(
      url,
      {
        "availabilities" : availabilities,
        
      },
      { headers: this.headers }
    ).pipe(map(data => data));
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

  realizar_pago(user: number, key: string, movieid : Array<any>, plan : Array<any>, exchangeRate: number, total:number, tarjeta : string ){
    const url = "http://localhost:3000/transaccion"
    return this.http.post<any>(
      url,
      {
        "user": user,
        "key": key, 
        "movieid" : movieid,
        "plan" : plan, 
        "exchangeRate" :  exchangeRate,
        "total" : total,
        "tarjeta" : tarjeta
      },
      { headers: this.headers }
    ).pipe(map(data => data));
  }

  getTasa(){
    const url = "http://localhost:3000/getTasa"
    return this.http.post<any>(
      url,
      { 
        
      },
      { headers: this.headers }
    ).pipe(map(data => data));
  }

}

