import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoOrdenComponent } from './ingreso-orden.component';

describe('IngresoOrdenComponent', () => {
  let component: IngresoOrdenComponent;
  let fixture: ComponentFixture<IngresoOrdenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresoOrdenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngresoOrdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
