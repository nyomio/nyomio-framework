import { TestBed } from '@angular/core/testing';

import { NyomioNgComponentsService } from './nyomio-ng-components.service';

describe('NyomioNgComponentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NyomioNgComponentsService = TestBed.get(NyomioNgComponentsService);
    expect(service).toBeTruthy();
  });
});
