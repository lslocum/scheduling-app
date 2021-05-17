import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { gameShowsData } from '../../../../data/game-shows.data';
import { GameShow } from '../../models/game-show';

@Injectable({
  providedIn: 'root'
})
export class GameShowDataService {
  fakeGameShowDatabase = [...gameShowsData];

  getGameShows(): Observable<GameShow[]> {
    return of(this.fakeGameShowDatabase);
  }

  getGameShow(showId: string): Observable<GameShow> {
    return of(this.fakeGameShowDatabase.find(u => u.showId === showId));
  }
}