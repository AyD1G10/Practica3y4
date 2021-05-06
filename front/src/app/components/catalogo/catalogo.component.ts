import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UserInterface } from 'src/app/models/user-inteface';
import { Router } from "@angular/router";

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  resultados: any;
  arreglo_carrito : Array<any> = new Array<any>();
  arreglo_pago : Array<any> = new Array<any>();

  constructor(public auth: UserService,public router: Router) { }

  ngOnInit(): void {
    this.getCatalogo();
  }
  cerrarSesion() {
    this.auth.logout();
  }
  gotoDetalles(id:number){
    this.router.navigate(['/detalleProducto',id]);
  }
  getCatalogo() {
      this.auth.getCatalogo().subscribe((res) => {
       
        this.resultados = res['list'];
         console.log(this.resultados);
      })
    }

    agregarCarrito(item:any){
      //alert("se agrego al carrito");
      this.arreglo_carrito.push(item);
      //console.log(item);
  
      this.auth.getPlanesPelicula(item.availabilities).subscribe((res)=>{
        
        let json_pelicula = {
          "id" : item._id,
          "name" : item.name,
          "chargeRate" : item.changerate,
          "availabilities" : res,
          "languages" : item.languages
        }
        this.arreglo_pago.push(json_pelicula);
        console.log(this.arreglo_pago);
      })
  
    }
  
    realizarpagoAlquiler(){
      console.log(JSON.stringify(this.arreglo_pago));
      localStorage.setItem('carrito', JSON.stringify(this.arreglo_pago));
      
      this.router.navigate(['/pagoalquiler']);
    }
}
