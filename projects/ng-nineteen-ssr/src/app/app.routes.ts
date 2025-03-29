import { Routes } from '@angular/router';
import { BooksComponent } from './books/books/books.component';
import { HomeComponent } from './home/home/home.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'books', component: BooksComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
