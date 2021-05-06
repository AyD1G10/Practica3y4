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

    if (this.email===""||this.password===""){
      alert("Debe llenar todos los campos");
    }else{
      this.auth.Login(this.email,this.password).subscribe((res) => {
        console.log(res)
        if(res[0]===undefined){
          alert("Usuario o Contrasena incorrectas");
        }else{
          let DataUser: UserInterface = res[0];
          this.auth.setCurrentUser(DataUser);
          this.router.navigate(['/Catalogo']);
        }
        
      })
      this.email="";
      this.password="";
    }
    
  }


  registrarse(){
    this.router.navigate(['/RegistrarUsuario']);
  }
}
