import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlUnidadesComponent } from './controlUnidades.component';

describe('CarteleraComponent', () => {
  let component: ControlUnidadesComponent;
  let fixture: ComponentFixture<ControlUnidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlUnidadesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlUnidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
