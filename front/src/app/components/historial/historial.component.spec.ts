import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialComponent } from './historial.component';
import { UserService } from 'src/app/services/user.service';
import { Router } from "@angular/router";

import {  of } from 'rxjs';

describe('HistorialComponent', () => {
  let component: HistorialComponent;
  let fixture: ComponentFixture<HistorialComponent>;
  let userService:UserService;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialComponent ]
    })
    .compileComponents();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
       {
          provide: UserService,
           useValue: {
            getHistorial: () => of({msg:true})
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
    fixture = TestBed.createComponent(HistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
