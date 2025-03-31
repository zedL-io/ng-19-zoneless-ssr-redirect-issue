import { createEnvironmentInjector, runInInjectionContext } from '@angular/core';
import { of } from 'rxjs';
import { BooksComponent } from './books.component';
import { BooksService } from '../services';
import { Book } from '../models';

describe('BooksComponent', () => {
  const mockBookData = [{ id: 1, name: 'Test Book', price: 20 }];
  const mockBooksService = {
    getBooks: () => of<Book[]>(mockBookData),
  };
  const injector = createEnvironmentInjector(
    [{ provide: BooksService, useValue: mockBooksService }],
    null!,
  );
  let component: BooksComponent;

  beforeEach(() => {
    runInInjectionContext(injector, () => {
      component = new BooksComponent();
    });
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have books data from service', () => {
    expect(component.books()).toEqual(mockBookData);
  });
});
