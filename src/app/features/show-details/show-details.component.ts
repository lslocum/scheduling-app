import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';

import { GameShow } from '../../shared/models/game-show';
import { ShowHost } from '../../shared/models/show-host';
import { ScheduleTime } from '../../shared/models/show-schedule';

import { ShowDetailsLogicService } from './services/show-details-logic.service';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.scss']
})
export class ShowDetailsComponent implements OnInit {
  show: GameShow;
  host: ShowHost;
  schedule: any[];

  constructor(
    private route: ActivatedRoute,
    private logicService: ShowDetailsLogicService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap(params => {
          return this.logicService.initializeShow(params.get('id')).pipe(
            tap(
              (data: {
                show: GameShow;
                host: ShowHost;
                schedule: any;
              }) => {
                this.show = data.show;
                this.host = data.host;
                this.schedule = data.schedule;
              }
            )
          );
        })
      )
      .subscribe();
  }

  addShowToSchedule(day: ScheduleTime): void {
    this.logicService.addShowToSchedule(this.show, day);
  }
}
