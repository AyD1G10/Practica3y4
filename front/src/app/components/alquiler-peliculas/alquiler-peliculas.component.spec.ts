import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlquilerPeliculasComponent } from './alquiler-peliculas.component';

import { UserService } from 'src/app/services/user.service';
import { Router } from "@angular/router";
import {  of } from 'rxjs';
describe('AlquilerPeliculasComponent', () => {
  let component: AlquilerPeliculasComponent;
  let fixture: ComponentFixture<AlquilerPeliculasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlquilerPeliculasComponent ]
    })
    .compileComponents();
  });
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
       {
          provide: UserService,
           useValue: {
            registarUsuario: () => of({msg:true})
          },
        }
      ]
    })
    .compileComponents();
   
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(AlquilerPeliculasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
