import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { GameShow } from '../../shared/models/game-show';
import { DaysOfTheWeek, ShowScheduleViewModel } from '../../shared/models/show-schedule';
import { User } from '../../shared/models/user';

import { DashboardLogicService } from './services/dashboard-logic.service';

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

  constructor(private logicService: DashboardLogicService) {}

  ngOnInit(): void {
    this.user$ = this.logicService.getUser();
    this.gameShows$ = this.logicService.getUserFavoriteShows();
    this.scheduledShows$ = this.logicService.getUserSchedule();
  }

  findAShow(): void {
    this.logicService.findAShow().subscribe();
  }

  removeSchedule(schedule): void {
    this.logicService.removeSchedule(schedule);
  }
}
