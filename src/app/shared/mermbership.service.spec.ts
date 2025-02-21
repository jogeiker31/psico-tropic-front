/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MermbershipService } from './mermbership.service';

describe('Service: Mermbership', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MermbershipService]
    });
  });

  it('should ...', inject([MermbershipService], (service: MermbershipService) => {
    expect(service).toBeTruthy();
  }));
});
