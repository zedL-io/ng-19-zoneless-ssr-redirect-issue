import { RenderMode, ServerRoute } from '@angular/ssr';
import { BooksComponent } from './books/books.component';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
