import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { hostsData } from '../../../../data/show-hosts.data';
import { showSchedulesData } from '../../../../data/show-schedules.data';
import { ShowHost } from '../../../shared/models/show-host';
import { ShowSchedule } from '../../../shared/models/show-schedule';

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
