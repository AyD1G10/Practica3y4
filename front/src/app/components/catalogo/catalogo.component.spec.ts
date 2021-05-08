import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoComponent } from './catalogo.component';
import { UserService } from 'src/app/services/user.service';
import { Router } from "@angular/router";
import {  of } from 'rxjs';

describe('CatalogoComponent', () => {


  let component: CatalogoComponent;
  let fixture: ComponentFixture<CatalogoComponent>;
  let userServiceMock: UserService;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
       {
          provide: UserService,
           useValue: {
               getCatalogo: () => of({msg:true})
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
    fixture = TestBed.createComponent(CatalogoComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
