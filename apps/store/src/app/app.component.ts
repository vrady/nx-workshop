import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { formatRating } from '@bg-hoard/store/util-formatters';
import { Game } from '@bg-hoard/util-interface';

@Component({
  selector: 'bg-hoard-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'store';
  games = this._http.get<Game[]>('/api/games');
  formatRating = formatRating;

  constructor(private _http: HttpClient) {}
}
