import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-alquiler-peliculas',
  templateUrl: './alquiler-peliculas.component.html',
  styleUrls: ['./alquiler-peliculas.component.css']
})
export class AlquilerPeliculasComponent implements OnInit {

  constructor(public userService: UserService) { }

  total : number = 0;
  plan : string = "";
  tarjeta : string = ""; 
  
  cerrarSesion() {
    this.userService.logout();
  }
  ngOnInit(): void {
    var user_string = {
      "carrito": [
          {
              "name" : "Pelicula 1",
              "chargeRate": 25,
              "availabilities": [
                  2
              ],
              "languages": [
                  1
              ]
          },
          {
              "name" : "Pelicula 2",
              "chargeRate": 75,
              "availabilities": [
                  1
              ],
              "languages": [
                  2
              ]
          }
      ]
  }
    localStorage.setItem('carrito', JSON.stringify(user_string));
    this.alquiler_pelicula();
  }


  alquiler_pelicula():void {
    let arreglo_carrito : any = [];
   // this.userService.alquiler_peliculas()
   // .subscribe((res:any) => {
   //   console.log(res);
   var carrito = localStorage.getItem('carrito');
    if(carrito){ 
        var obj = JSON.parse(carrito);
        var cuerpohtml = "<thead class=\"thead-dark\"><tr><th scope=\"col\">#</th><th scope=\"col\">Pelicula</th><th scope=\"col\">Precio</th><th scope=\"col\">Plan</th><th scope=\"col\">Lenguaje</th></tr></thead>";
        let cont = 1;
        cuerpohtml = cuerpohtml + "<tbody>";
        for(let elem of obj.carrito){
          cuerpohtml += "<tr><th scope=\"row\">" + cont + "</th><td>" + elem.name + 
                "</td><td>" + elem.chargeRate +"</td>"  + 
                "</td><td>" + elem.availabilities + 
                "</td><td>" + elem.languages + 
                "</td>" +  "</tr>";
          cont++;
          this.total = this.total + elem.chargeRate;
        }
        cuerpohtml = cuerpohtml + "</tbody><br><br>";
        cuerpohtml = cuerpohtml + "<table class=\"table\"><thead class=\"thead-light\"><tr><th scope=\"col\">Total</th><th scope=\"col\">" +this.total +"</th></tr></thead></table>"
        document.getElementById("tablacarrito")!.innerHTML = cuerpohtml; 
        console.log("total", this.total);
      }
   // })


    
  }
}