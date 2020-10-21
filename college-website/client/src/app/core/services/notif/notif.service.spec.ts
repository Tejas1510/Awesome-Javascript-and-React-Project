import { TestBed } from '@angular/core/testing';

import { NotifService } from './notif.service';

describe('NotifService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotifService = TestBed.get(NotifService);
    expect(service).toBeTruthy();
  });
});
