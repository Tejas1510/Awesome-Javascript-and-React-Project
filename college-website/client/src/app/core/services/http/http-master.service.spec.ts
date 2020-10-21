import { TestBed } from '@angular/core/testing';

import { HttpMasterService } from './http-master.service';

describe('HttpMasterService', () => {
  let service: HttpMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
