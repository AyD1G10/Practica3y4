import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-alquiler-peliculas',
  templateUrl: './alquiler-peliculas.component.html',
  styleUrls: ['./alquiler-peliculas.component.css']
})
export class AlquilerPeliculasComponent implements OnInit {

  constructor(public userService: UserService) { }

  cerrarSesion() {
    this.userService.logout();
  }
  ngOnInit(): void {
  }

}