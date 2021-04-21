import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email: string = "";
  public password: string="";

  constructor(public auth: UserService) { }

  ngOnInit(): void {
  }

  login() {
    let userLogged;
    if (this.email===""||this.password===""){
      //alert("Debe llenar todos los campos");
      userLogged = 'Llenar todos los campos';
      this.email="";
      this.password="";
      return userLogged;
    }else{
      this.auth.Login(this.email,this.password).subscribe((res) => {
        if (res) {
          alert("TRUE");
          userLogged = 'login_valid';
          this.email="";
          this.password="";
        } else {
          alert("FALSE");
           userLogged = 'login_invalid';
           this.email="";
           this.password="";
        }
      })
      this.email="";
      this.password="";
      return userLogged;
    }
    
  }

  registrarse(){
   
  }
}
