import { TestBed } from '@angular/core/testing';

import { MasterModelService } from './master-model.service';

describe('MasterModelService', () => {
  let service: MasterModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
