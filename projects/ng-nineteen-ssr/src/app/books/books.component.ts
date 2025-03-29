import { CurrencyPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-books',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
})
export class BooksComponent {
  books = signal([
    { id: 1, name: 'Dune', price: 2.34 },
    { id: 2, name: 'Dune 2', price: 2.78 },
    { id: 3, name: 'Dune 3', price: 2.65 },
  ]);
}
