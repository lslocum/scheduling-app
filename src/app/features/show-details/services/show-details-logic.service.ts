import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';


import { GameShow } from '../../../shared/models/game-show';
import { DaysOfTheWeek, ScheduleTime, ShowSchedule } from '../../../shared/models/show-schedule';
import { GameShowService } from '../../../shared/services/game-show/game-show.service';
import { UserService } from '../../../shared/services/user/user.service';

import { ShowDetailDataService } from './show-details-data.service';

@Injectable({
  providedIn: 'root',
})
export class ShowDetailsLogicService {
  constructor(
    private dataService: ShowDetailDataService,
    private gameService: GameShowService,
    private userService: UserService,
    private titleService: Title
  ) {}

  setTitle(showTitle: string): void {
    this.titleService.setTitle(`${showTitle} Details`);
  }

  initializeShow(showId: string) {
    return forkJoin({
      show: this.gameService.getGameShow(showId),
      schedule: this.dataService.getShowSchedule(showId),
    }).pipe(
      map(({ show, schedule }: { show: GameShow; schedule: ShowSchedule }) => {
        const scheduleForTable =
          schedule?.daysOfTheWeek.map((day) => ({
            day: DaysOfTheWeek[day],
            time: schedule.showTime,
          })) ?? [];
        this.setTitle(show.title);

        return { show, schedule: scheduleForTable };
      }),
      switchMap(({ show, schedule }) =>
        this.dataService.getHost(show.hostId).pipe(map((host) => ({ show, host, schedule })))
      )
    );
  }

  addShowToSchedule(show: GameShow, day: ScheduleTime): void {
    this.userService.addShowToSchedule(show, day);
  }
}
