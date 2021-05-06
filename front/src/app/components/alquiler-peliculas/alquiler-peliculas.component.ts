import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";
@Component({
  selector: 'app-alquiler-peliculas',
  templateUrl: './alquiler-peliculas.component.html',
  styleUrls: ['./alquiler-peliculas.component.css']
})
export class AlquilerPeliculasComponent implements OnInit {

  constructor(public userService: UserService, public router: Router) { }

  total : number = 0;
  plan : string = "";
  tarjeta : string = ""; 
  arreglo : any = JSON.parse(localStorage.getItem('carrito')!);
  usuario : any = JSON.parse(localStorage.getItem('UsuarioLogueado')!);
   arrP : Array<any> = new Array<any>();
   arrE : Array<any> = new Array<any>();
  selected = "----"
  repetidos : Array<any> = new Array<any>();

  update(e:any, item:any){
    this.selected = e.target.value
    console.log(this.selected);
    console.log(item);
    this.total += item.chargeRate * Number(this.selected);
    this.arrE.push(item.chargeRate),
    this.arrP.push(this.selected);
  }
  resetear(){
    this.total = 0;
    this.repetidos = [];
  }
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
    //localStorage.setItem('carrito', JSON.stringify(user_string));
    console.log(this.arreglo);
   // this.alquiler_pelicula();
   // this.prueba();
  }

  prueba(){
    console.log(document.getElementById("select1")?.addEventListener("click", this.prueba2, true));
  }

  prueba2(){
    console.log("true")
  }

  cancelar(){
    this.router.navigate(['/catologo']);
  }

  transaccion(){
    var llave = Date.now().toString().substr(0,4) + Math.random().toString(10).substr(5, 4);
    let arrM : Array<any> = new Array<any>();
    

    for(let items of this.arreglo){
      arrM.push(items.id);
      
    }

    this.userService.realizar_pago(this.usuario._id, llave, arrM, this.arrP, this.arrE, this.total)
    .subscribe((res)=>{
      console.log(res);
      alert("Se realizo la transaccion correctamente.");
    }
    )
    
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
        let contplan = 1;
        for(let elem of obj){
          cuerpohtml += "<tr><th scope=\"row\">" + cont + "</th><td>" + elem.name + 
                "</td><td>" + elem.chargeRate +"</td>" +
                
                "</td><td>" + " <select class=\"custom-select\" id=\"select" + contplan+ " [onchange] = item\"><option selected>Seleccionar Plan...</option>";
                
                for(let val of elem.availabilities){
                  cuerpohtml += "<option value=" + contplan +">" + val.name + "</option>"
                  contplan++;
                }
                //"<option value=\"1\">One</option><option value=\"2\">Two</option><option value=\"3\">Three</option>
                cuerpohtml +=  "</select>" + 
                "</td><td>" + elem.languages + 
                "</td>" +  "</tr>";
          cont++;
          this.total = this.total + elem.chargeRate;
        }
        cuerpohtml = cuerpohtml + "</tbody><br><br>";
        cuerpohtml = cuerpohtml + "<table class=\"table\"><thead class=\"thead-light\"><tr><th scope=\"col\">Total</th><th scope=\"col\">" +this.total +"</th></tr></thead></table>"
        document.getElementById("tablacarrito")!.innerHTML = cuerpohtml; 
        console.log(document.getElementById("inputGroupSelect01")?.textContent)
        console.log("total", this.total);


      }
   // })


    
  }

  
}