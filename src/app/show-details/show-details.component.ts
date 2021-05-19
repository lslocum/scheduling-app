import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { GameShow } from 'src/app/shared/models/game-show';
import { ShowHost } from 'src/app/shared/models/show-host';
import { DaysOfTheWeek, ScheduleTime, ShowSchedule } from 'src/app/shared/models/show-schedule';
import { GameShowService } from 'src/app/shared/services/game-show/game-show.service';
import { UserService } from 'src/app/shared/services/user/user.service';

import { ShowDetailDataService } from './show-details-data.service';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.scss'],
})
export class ShowDetailsComponent implements OnInit {
  show: GameShow;
  host: ShowHost;
  schedule: ScheduleTime[];
  wikiUrl: SafeUrl;

  constructor(
    private route: ActivatedRoute,
    private dataService: ShowDetailDataService,
    private gameService: GameShowService,
    private userService: UserService,
    private titleService: Title,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          return this.initializeShow(params.get('id'));
        })
      )
      .subscribe();
  }

  addShowToSchedule(day: ScheduleTime): void {
    this.userService.addShowToSchedule(this.show, day);
  }

  private initializeShow(showId: string) {
    return forkJoin({
      show: this.gameService.getGameShow(showId),
      schedule: this.dataService.getShowSchedule(showId),
    }).pipe(
      map(({ show, schedule }: { show: GameShow; schedule: ShowSchedule }) => {
        this.schedule =
          schedule?.daysOfTheWeek.map((day) => ({
            day: DaysOfTheWeek[day],
            time: schedule.showTime,
          })) ?? [];

        this.setTitle(show.title);
        this.show = show;
        this.wikiUrl = this.sanitizer.bypassSecurityTrustResourceUrl(show.url);

        return show;
      }),
      switchMap((show: GameShow) =>
        this.dataService.getHost(show.hostId).pipe(
          tap((host) => {
            this.host = host;
          })
        )
      )
    );
  }

  private setTitle(showTitle: string): void {
    this.titleService.setTitle(`${showTitle} Details`);
  }
}
