/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserBooksService } from './user-books.service';

describe('Service: UserBooks', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserBooksService]
    });
  });

  it('should ...', inject([UserBooksService], (service: UserBooksService) => {
    expect(service).toBeTruthy();
  }));
});
