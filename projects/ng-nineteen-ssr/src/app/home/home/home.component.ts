import { Component } from '@angular/core';
import { NewsComponent } from '../news/news.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [NewsComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
