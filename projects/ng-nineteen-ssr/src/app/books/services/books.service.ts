import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Book } from '../models';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  getBooks(): Observable<Book[]> {
    return of([
      { id: 1, name: 'Book 1', price: 10 },
      { id: 2, name: 'Book 2', price: 20 },
      { id: 3, name: 'Book 3', price: 30 },
    ]);
  }
}
