import { TestBed } from '@angular/core/testing';

import { BooksService } from './books.service';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('BooksService', () => {
  let service: BooksService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideExperimentalZonelessChangeDetection()],
    });
    service = TestBed.inject(BooksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
