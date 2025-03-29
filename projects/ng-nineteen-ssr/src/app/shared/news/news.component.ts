import { isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID, signal } from '@angular/core';

@Component({
  selector: 'app-news',
  imports: [],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})
export class NewsComponent {
  #platformId = inject(PLATFORM_ID);
  newsCount = signal(0);

  constructor(){
    if(isPlatformBrowser(this.#platformId)){
      this.newsCount.set(1);
    }
  }
}
