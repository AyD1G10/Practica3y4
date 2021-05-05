import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router'; 
@Component({
  selector: 'app-detalle-pelicula',
  templateUrl: './detalle-pelicula.component.html',
  styleUrls: ['./detalle-pelicula.component.css']
})
export class DetallePeliculaComponent implements OnInit {
  public idPelicula:string ="";
  imgURL: any ;
  peliculaNombre: any ;
  rate:any;
  mensaje:any;
  active:any;
  constructor(public userService: UserService, public router: Router,private route: ActivatedRoute,) { }
  
  ngOnInit(): void {
    this.idPelicula = String(this.route.snapshot.paramMap.get("id"));
    
    this.userService.getDetallesPelicula(this.idPelicula).subscribe((res) => {

      console.log(res);
      this.imgURL = res[0]['image'];
      this.peliculaNombre=res[0]['name'];
      this.rate=res[0]['exchangeRate'];
      this.active=res[0]['active']
      if(this.active){

        this.mensaje="Disponible";
      }else{

        this.mensaje="No Disponible";
      }
    })

  }

  cerrarSesion() {
    this.userService.logout();
  }
  gotoCatalogo(){
    this.router.navigate(['/catalogo']);
  }
  gotoAlquiler(){
    this.router.navigate([' ']);
  }
  
}
