import { TestBed } from '@angular/core/testing';

import { MayorMenorAPIService } from './mayor-menor-api.service';

describe('MayorMenorAPIService', () => {
  let service: MayorMenorAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MayorMenorAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
