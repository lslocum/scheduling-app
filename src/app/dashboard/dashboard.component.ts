import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable, zip } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';

import { groupScheduleByDay } from 'src/app/shared/functions/group-by';
import { sortGameShowByTitle, sortShowScheduleByTime } from 'src/app/shared/functions/sort-by';
import { GameShow } from 'src/app/shared/models/game-show';
import { ShowScheduleViewModel, DaysOfTheWeek } from 'src/app/shared/models/show-schedule';
import { User } from 'src/app/shared/models/user';
import { GameShowService } from 'src/app/shared/services/game-show/game-show.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  user$: Observable<User>;
  gameShows$: Observable<GameShow[]>;
  scheduledShows$: Observable<{ [key: string]: ShowScheduleViewModel[] }>;
  daysOfTheWeek = Object.values(DaysOfTheWeek);

  constructor(
    private userService: UserService,
    private gameShowService: GameShowService,
    private modalService: ModalService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.user$ = this.userService.currentUser;
    this.gameShows$ = this.userService.favoriteShows.pipe(
      map((shows: GameShow[]) => shows.sort((a, b) => sortGameShowByTitle(a, b)))
    );
    this.scheduledShows$ = this.getUserSchedule();
    this.titleService.setTitle('Dashboard');
  }

  getUserSchedule(): Observable<{ [key: string]: ShowScheduleViewModel[] }> {
    return this.userService.scheduledShows.pipe(
      map((scheduledShows: ShowScheduleViewModel[]) => {
        const sortedShows: { [key: string]: ShowScheduleViewModel[] } = {};

        if (scheduledShows.length) {
          const showsGroupedByWeekDay = groupScheduleByDay(scheduledShows);

          Object.values(DaysOfTheWeek).forEach((day) => {
            if (showsGroupedByWeekDay[day]) {
              const timeSortedShows: ShowScheduleViewModel[] = showsGroupedByWeekDay[day].sort((a, b) =>
                sortShowScheduleByTime(a, b)
              );
              sortedShows[day] = timeSortedShows;
            }
          });
        }

        return sortedShows;
      })
    );
  }

  findAShow(): void {
    zip(this.gameShowService.getGameShows(), this.gameShows$)
      .pipe(
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
      )
      .subscribe();
  }

  removeSchedule(schedule: ShowScheduleViewModel): void {
    this.userService.removeShowFromSchedule(schedule);
  }
}
