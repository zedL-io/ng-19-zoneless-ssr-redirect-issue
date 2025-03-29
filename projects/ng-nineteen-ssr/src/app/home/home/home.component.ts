import { Component } from '@angular/core';

import { RouterLink } from '@angular/router';
import { NewsComponent } from '@ng-nineteen-ssr/shared';

@Component({
  selector: 'app-home',
  imports: [NewsComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
