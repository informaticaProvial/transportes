import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CantidadAsientosComponent } from './cantidad-asientos.component';

describe('CantidadAsientosComponent', () => {
  let component: CantidadAsientosComponent;
  let fixture: ComponentFixture<CantidadAsientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CantidadAsientosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CantidadAsientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
