import { TestBed } from '@angular/core/testing';

import { ControlUnidadesService } from './controlUnidades.service';

describe('MovieService', () => {
  let service: ControlUnidadesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControlUnidadesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
