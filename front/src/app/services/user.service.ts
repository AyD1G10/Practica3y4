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
    const url = "http://localhost:3000/login";

    return this.http.post<any>(url,
      {
        "usuario":email,
        "password":password
      }
      , { headers: this.headers })
      .pipe(map(data => data));
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
}

