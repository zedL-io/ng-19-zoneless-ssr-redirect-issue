import { BooksComponent } from './books.component';
import { BooksService } from '../services';
import { of } from 'rxjs';
import {
  EnvironmentInjector,
  inject,
  createEnvironmentInjector,
  runInInjectionContext,
} from '@angular/core';
import { Book } from '../models';

// Mock für BooksService
const mockBooksService = {
  getBooks: () => of<Book[]>([{ id: 1, name: 'Test Book', price: 20 }]),
};

describe('BooksComponent', () => {
  let component: BooksComponent;
  const injector = createEnvironmentInjector(
    [{ provide: BooksService, useValue: mockBooksService }],
    null!,
  );

  beforeEach(() => {
    runInInjectionContext(injector, () => {
      component = new BooksComponent();
    });
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have books data from service', () => {
    expect(component.books()).toEqual([{ id: 1, name: 'Test Book', price: 20 } as any]);
  });
});
