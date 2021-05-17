import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { GameShow } from '../../models/game-show';
import { GameShowDataService } from './game-show-data.service';

@Injectable({
  providedIn: 'root'
})
export class GameShowService {
  allGameShows = new BehaviorSubject<GameShow[]>([]);

  constructor(private gameShowDataService: GameShowDataService) {}

  getGameShows(): Observable<GameShow[]> {
    return this.gameShowDataService.getGameShows().pipe(
      tap((gameShows: GameShow[]) => {
        this.allGameShows.next(gameShows);
      })
    );
  }
  getGameShow(showId: string): Observable<GameShow> {
    return this.gameShowDataService.getGameShow(showId);
  }
}
