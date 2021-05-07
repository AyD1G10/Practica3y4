import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UserInterface } from 'src/app/models/user-inteface';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email: string = "";
  public password: string="";

  constructor(public auth: UserService,public router: Router) { }

  ngOnInit(): void {
  }

  login() {
    let userLogged;
    if (this.email===""||this.password===""){
      alert("Debe llenar todos los campos");
      return false;
    }else{
      this.auth.Login(this.email,this.password).subscribe((res) => {
        console.log(res)
        if(res[0]===undefined){
          alert("Usuario o Contrasena incorrectas");
          userLogged = 'login_invalid';
          return false;
        }else{
          let DataUser: UserInterface = res[0];
          this.auth.setCurrentUser(DataUser);
          this.router.navigate(['/']);
          userLogged = 'login_valid';
          return true;
        }
        
      })
      this.email="";
      this.password="";
      userLogged = 'login_invalid';
      return false;
    }
    
  }


  registrarse(){
    this.router.navigate(['/RegistrarUsuario']);
  }
}
