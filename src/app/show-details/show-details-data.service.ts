import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ShowHost } from 'src/app/shared/models/show-host';
import { ShowSchedule } from 'src/app/shared/models/show-schedule';
import { hostsData } from 'src/data/show-hosts.data';
import { showSchedulesData } from 'src/data/show-schedules.data';


@Injectable({
  providedIn: 'root'
})
export class ShowDetailDataService {
  getHost(hostId: string): Observable<ShowHost> {
    const host = hostsData.find(host => host.hostId === hostId);
    return of(host);
  }

  getShowSchedule(showId: string): Observable<ShowSchedule> {
    const schedule = showSchedulesData.find(s=> s.showId === showId);
    return of(schedule);
  }
}
