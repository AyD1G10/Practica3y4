import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarUsuarioComponent } from './registrar-usuario.component';
import { UserService } from 'src/app/services/user.service';
import { Router } from "@angular/router";

import {  of } from 'rxjs';
import { ComponentRef } from '@angular/core';

describe('RegistrarUsuarioComponent', () => {
  let component: RegistrarUsuarioComponent;
  let fixture: ComponentFixture<RegistrarUsuarioComponent>;
  let userServiceMock: UserService;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarUsuarioComponent ]
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
    fixture = TestBed.createComponent(RegistrarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Registro Fail ', () => {
     
    component.email='ejemplo1@gmail.com';
    component.password = '';
   
    console.log(component.registrarse());
    expect(component.registrarse()).toEqual(false);
  });

  it(' Registro Success ', () => {
    component.email='aa';
    component.password = '123';
    component.nombre = 'aaron';
    component.apellido = 'juarez';
    component.confirmarPassword = '123';
    component.creditCard="1234";
    component.edad = "25";
    component.dpi = '123';
    component.usuario = 'aaaa';
    const mockedResponse = {
      "creditCard": [
          "1234"
      ],
      "History": [],
      "Rented": [],
      "_id": "6094e918dc668b1618fe05be",
      "name": "David",
      "lastname": "Tortola",
      "username": "dtortola",
      "email": "dtortola@gmail.com",
      "password": "1234",
      "dpi": "1234",
      "age": 25,
      "type": 1,
      "__v": 0
    } ; // Modify as per your need
    jasmine.createSpy('registrarUsuario').and.callFake(() => {
      return of(mockedResponse);
    });

   
    expect(component.registrarse()).toEqual(true);
  });
  
});
