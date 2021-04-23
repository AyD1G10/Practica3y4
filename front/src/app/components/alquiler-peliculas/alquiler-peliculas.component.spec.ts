import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlquilerPeliculasComponent } from './alquiler-peliculas.component';

describe('AlquilerPeliculasComponent', () => {
  let component: AlquilerPeliculasComponent;
  let fixture: ComponentFixture<AlquilerPeliculasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlquilerPeliculasComponent ]
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
