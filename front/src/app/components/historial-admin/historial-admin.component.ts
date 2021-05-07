import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-historial-admin',
  templateUrl: './historial-admin.component.html',
  styleUrls: ['./historial-admin.component.css']
})
export class HistorialAdminComponent implements OnInit {

  resultados: any;

  constructor(public auth: UserService,public router: Router) { }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('UsuarioLogueado')||'{}');
    user = user.type;
    //if(user == 0) {
      this.getHistorialAdmin();
    //}
  }

  cerrarSesion() {
    this.auth.logout();
  }

  getHistorialAdmin() {
    this.auth.getHistorialAdmin().subscribe((res)=>{
      this.resultados = res;
      console.log(res);
    });
  }

}
