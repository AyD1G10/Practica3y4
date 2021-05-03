import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UserInterface } from 'src/app/models/user-inteface';
import { Router } from "@angular/router";

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  resultados: any;

  constructor(public auth: UserService,public router: Router) { }

  ngOnInit(): void {
    
    this.getHistorial();
  }

  cerrarSesion() {
    this.auth.logout();
  }

  getHistorial() {
    
    this.auth.getHistorial().subscribe((res)=>{
      this.resultados = res;
      console.log(res);
    });
  }
}
