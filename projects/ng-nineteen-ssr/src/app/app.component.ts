import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NewsComponent } from "./news/news.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NewsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = signal('ng-nineteen-ssr');

  changeTitle() {
    this.title.set('ng-nineteen-ssr 2');
  }
}
