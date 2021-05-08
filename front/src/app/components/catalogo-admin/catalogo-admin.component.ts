import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-catalogo-admin',
  templateUrl: './catalogo-admin.component.html',
  styleUrls: ['./catalogo-admin.component.css']
})
export class CatalogoAdminComponent implements OnInit {

  constructor(public auth: UserService,public router: Router) { }
  resultados: any;

  ngOnInit(): void {
    this.getCatalogo();
  }

  getCatalogo() {
    
    this.auth.getCatalogoAdmin().subscribe((res) => {
     
      this.resultados = res['list'];
       console.log(this.resultados);
    })
  }

  cerrarSesion() {
    this.auth.logout();
  }
  catalogo(){
    this.router.navigate(['/Catalogo']);
  }

  historial(){
    this.router.navigate(['/historial']);
  }

  alquilar(){
    this.router.navigate(['/pagoalquiler']);
    
  }
}
