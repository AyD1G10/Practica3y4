import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { UserService } from 'src/app/services/user.service';
import { Router } from "@angular/router";
import {  of } from 'rxjs';

class UserServiceMock {
  Login = jasmine.createSpy('userService.Login');
  get = jasmine.createSpy('httpClient.get');
  post = jasmine.createSpy('httpClient.post');
  router = jasmine.createSpyObj('Router', ['navigate']);
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userServiceMock: UserService;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
       {
       
              provide: UserService,
              useValue: {
               Login: () => of( {
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
            })
             },
        

            },
            {
              provide:Router,
             useValue: mockRouter
            }
      ]
    })
    .compileComponents();
   
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    
    userServiceMock = TestBed.get(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Login Fail', () => {
     
    component.email='ejemplo1@gmail.com';
    component.password = '';
   
    console.log(component.login());
    expect(component.login()).toBeFalse;
  });

  it(' Login Success ', () => {
    component.email='aa';
    component.password = '123';
  
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
    spyOn(userServiceMock, 'Login').and.callFake(() => {
      return of(mockedResponse);
    });

   
    expect(component.login()).toBeTrue;
  });
});
