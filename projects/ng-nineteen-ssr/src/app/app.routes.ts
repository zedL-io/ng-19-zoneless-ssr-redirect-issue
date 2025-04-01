import { Routes } from '@angular/router';
import { BooksComponent } from './books/books/books.component';
import { HomeComponent } from './home/home/home.component';

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const redirectGuard: CanActivateFn = () => {
  const router = inject(Router);
  return router.createUrlTree(['/home']);
};

export const routes: Routes = [
  // { path: '', canActivate: [redirectGuard], children: [] }, // this work!
  { path: 'home', component: HomeComponent },
  { path: 'books', component: BooksComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' }, // this doesn't work
];
