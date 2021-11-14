import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { map, switchMap } from 'rxjs/operators';

import { formatRating } from '@bg-hoard/store/util-formatters';
import { Game } from '@bg-hoard/util-interface';

@Component({
  selector: 'bg-hoard-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss']
})
export class GameDetailComponent {
  game$ = this._route.paramMap.pipe(
    map((params: ParamMap) => params.get('id')),
    switchMap(id => this._http.get<Game>(`/api/games/${id}`))
  );
  formatRating = formatRating;

  constructor(
    private _route: ActivatedRoute,
    private _http: HttpClient,
  ) {}
}
