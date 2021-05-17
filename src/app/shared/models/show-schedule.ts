export enum DaysOfTheWeek {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}

export interface ShowSchedule {
  showId: string;
  showTime: string;
  daysOfTheWeek: DaysOfTheWeek[];
}

export interface ShowScheduleViewModel {
  showId: string;
  title: string;
  day: string;
  time: string;
}

export interface ScheduleTime {
  day: string;
  time: string;
}
