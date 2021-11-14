import { Component } from '@angular/core';

import { formatRating } from '@bg-hoard/store/util-formatters';

import { getAllGames } from '../fake-api';

@Component({
  selector: 'bg-hoard-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'store';
  games = getAllGames();
  formatRating = formatRating;
}
