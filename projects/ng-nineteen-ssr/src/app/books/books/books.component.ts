import { CurrencyPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { BooksService } from '../services';

@Component({
  selector: 'app-books',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
})
export class BooksComponent {
  books = toSignal(inject(BooksService).getBooks());
}
