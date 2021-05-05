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

  agregarCarrito(){
    alert("se agrego al carrito");
  }
}
