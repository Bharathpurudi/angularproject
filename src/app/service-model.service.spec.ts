import { TestBed } from '@angular/core/testing';

import { ServiceModelService } from './service-model.service';

describe('ServiceModelService', () => {
  let service: ServiceModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
