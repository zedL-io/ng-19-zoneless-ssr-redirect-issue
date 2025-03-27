import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NewsComponent } from "./news/news.component";
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NewsComponent, CurrencyPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = signal('ng-nineteen-ssr');

  changeTitle() {
    this.title.set('ng-nineteen-ssr 2');
  }

  books = signal([{id: 1, name: 'Dune', price: 2.34}, {id: 2, name: 'Dune 2', price: 2.78}, {id: 3, name: 'Dune 3', price: 2.65}, ])
}
