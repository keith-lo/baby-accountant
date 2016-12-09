/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PurposesService } from './purposes.service';

describe('PurposesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PurposesService]
    });
  });

  it('should ...', inject([PurposesService], (service: PurposesService) => {
    expect(service).toBeTruthy();
  }));
});
