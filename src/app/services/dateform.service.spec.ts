import { TestBed } from '@angular/core/testing';

import { DateformService } from './dateform.service';

describe('DateformService', () => {
  let service: DateformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
