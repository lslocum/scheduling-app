import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable, scheduled, zip } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';

import { GameShow } from '../../../shared/models/game-show';
import { DaysOfTheWeek, ShowScheduleViewModel } from '../../../shared/models/show-schedule';
import { GameShowService } from '../../../shared/services/game-show/game-show.service';
import { ModalService } from '../../../shared/services/modal.service';
import { UserService } from '../../../shared/services/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardLogicService {
  constructor(
    private userService: UserService,
    private gameShowService: GameShowService,
    private modalService: ModalService,
    private titleService: Title
  ) {}

  setTitle() {
    this.titleService.setTitle('Dashboard');
  }

  getUser() {
    return this.userService.getCurrentUser();
  }

  getUserFavoriteShows(): Observable<GameShow[]> {
    return this.userService
      .getUsersFavoriteShows()
      .pipe(map((shows) => shows.sort((a, b) => (a.title > b.title ? 1 : -1))));
  }

  getUserSchedule(): Observable<{ [key: string]: ShowScheduleViewModel[] }> {
    return this.userService.getScheduledShows().pipe(
      map((scheduledShows: ShowScheduleViewModel[]) => {
        let sortedShows: { [key: string]: ShowScheduleViewModel[] } = {};

        if (scheduledShows.length) {
          const showsGroupedByWeekDay = this.groupSchedule(scheduledShows);

          Object.values(DaysOfTheWeek).forEach((day) => {
            if (showsGroupedByWeekDay[day]) {
              const timeSortedShows: ShowScheduleViewModel[] = showsGroupedByWeekDay[day].sort((a, b) =>
                this.sortByTime(a, b)
              );
              sortedShows[day] = timeSortedShows;
            }
          });
        }

        return sortedShows;
      })
    );
  }

  private sortByTime(a, b) {
    return a.time === b.time ? 0 : a.time > b.time ? 1 : -1;
  }

  private groupSchedule(scheduledShows: ShowScheduleViewModel[]): { [key: string]: ShowScheduleViewModel[] } {
    return scheduledShows.reduce(function (r, a) {
      r[a.day] = r[a.day] || [];
      r[a.day].push(a);
      return r;
    }, Object.create(null));
  }

  findAShow() {
    return zip(this.gameShowService.getGameShows(), this.getUserFavoriteShows()).pipe(
      take(1),
      switchMap(([allShows, userShows]) => {
        return this.modalService
          .openFindAShowModal(allShows, userShows)
          .afterClosed()
          .pipe(
            tap((shows: GameShow[]) => {
              this.userService.updateFavoriteShows(shows);
            })
          );
      })
    );
  }

  removeSchedule(schedule): void {
    this.userService.removeShowFromSchedule(schedule);
  }
}
