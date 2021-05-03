import { Component, OnInit } from '@angular/core';
import {  UserService } from '../../services/user.service';
import { UserInterface } from "../../models/user-inteface";
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {
  public imagePath:any;
  imgURL: any = "https://t4.ftcdn.net/jpg/01/19/32/93/240_F_119329387_sUTbUdeyhk0nuhNw5WaFvOyQFmxeppjX.jpg";
  public message: string ="";

  constructor(public crudService: UserService,private http: HttpClient) { }

  nombre: string="";
  apellido: string ="";
  password: string ="";
  usuario: string="";
  dpi: string="";
  confirmarPassword: string="";
  email: string="";
  date: Date = new Date();
  Usuarios: UserInterface[] = [];

  ngOnInit(): void {
    
  }
  registrarse(){
    if(this.nombre==="" || this.apellido===""|| this.password==="" ||this.confirmarPassword ===""||this.email===""||this.usuario===""||this.dpi===""){
      alert("Debe llenar todos los campos");
   }else if (this.password!=this.confirmarPassword) {
      alert("La contrasena no coincide con la confirmacion");
   }else{

    this.crudService.registarUsuario(this.nombre,this.apellido,this.usuario,this.dpi,this.password,this.email,this.date).subscribe((res) => {
      console.log(res);
      if (res['respuesta']) {
        alert("Usuario registrado con exito");
        this.nombre ="";
        this.apellido ="";
        this.usuario ="";
        this.dpi="";
        this.password = "";
        this.confirmarPassword="";
        this.email = "";
        this.date = new Date();
      } else {
         alert(res["mensaje"]);
      }
    })
   }


  }
}