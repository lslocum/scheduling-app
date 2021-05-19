import { ShowScheduleViewModel } from '../models/show-schedule';

export function groupScheduleByDay(scheduledShows: ShowScheduleViewModel[]): {
  [key: string]: ShowScheduleViewModel[];
} {
  return scheduledShows.reduce(function (r, a) {
    r[a.day] = r[a.day] || [];
    r[a.day].push(a);
    return r;
  }, Object.create(null));
}
