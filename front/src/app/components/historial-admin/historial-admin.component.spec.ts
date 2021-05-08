import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialAdminComponent } from './historial-admin.component';
import { UserService } from 'src/app/services/user.service';
import { Router } from "@angular/router";

import {  of } from 'rxjs';

describe('HistorialAdminComponent', () => {
  let component: HistorialAdminComponent;
  let fixture: ComponentFixture<HistorialAdminComponent>;
  let userService:UserService;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
       {
          provide: UserService,
           useValue: {
            getHistorialAdmin: () => of({msg:true})
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
    fixture = TestBed.createComponent(HistorialAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
