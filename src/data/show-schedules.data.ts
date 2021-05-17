import {
  DaysOfTheWeek,
  ShowSchedule
} from '../app/shared/models/show-schedule';

export const showSchedulesData: ShowSchedule[] = [
  {
    showId: '1',
    showTime: '5:00 PM',
    daysOfTheWeek: [
      DaysOfTheWeek.Monday,
      DaysOfTheWeek.Tuesday,
      DaysOfTheWeek.Wednesday,
      DaysOfTheWeek.Thursday,
      DaysOfTheWeek.Friday
    ]
  },
  {
    showId: '2',
    showTime: '9:00 AM',
    daysOfTheWeek: [
      DaysOfTheWeek.Monday,
      DaysOfTheWeek.Tuesday,
      DaysOfTheWeek.Wednesday,
      DaysOfTheWeek.Thursday,
      DaysOfTheWeek.Friday
    ]
  },
  {
    showId: '3',
    showTime: '6:00 PM',
    daysOfTheWeek: [
      DaysOfTheWeek.Monday,
      DaysOfTheWeek.Tuesday,
      DaysOfTheWeek.Wednesday,
      DaysOfTheWeek.Thursday,
      DaysOfTheWeek.Friday
    ]
  },
  {
    showId: '4',
    showTime: '7:00 PM',
    daysOfTheWeek: [DaysOfTheWeek.Thursday]
  },
  {
    showId: '5',
    showTime: '4:00 PM',
    daysOfTheWeek: [
      DaysOfTheWeek.Monday,
      DaysOfTheWeek.Tuesday,
      DaysOfTheWeek.Wednesday,
      DaysOfTheWeek.Thursday,
      DaysOfTheWeek.Friday
    ]
  },
  {
    showId: '6',
    showTime: '7:00 PM',
    daysOfTheWeek: [DaysOfTheWeek.Tuesday]
  },
  {
    showId: '7',
    showTime: '4:30 PM',
    daysOfTheWeek: [
      DaysOfTheWeek.Monday,
      DaysOfTheWeek.Tuesday,
      DaysOfTheWeek.Wednesday,
      DaysOfTheWeek.Thursday,
      DaysOfTheWeek.Friday
    ]
  },
  {
    showId: '8',
    showTime: '8:00 PM',
    daysOfTheWeek: [DaysOfTheWeek.Wednesday]
  },
  {
    showId: '9',
    showTime: '8:00 PM',
    daysOfTheWeek: [DaysOfTheWeek.Monday]
  },
  {
    showId: '10',
    showTime: '7:00 PM',
    daysOfTheWeek: [DaysOfTheWeek.Friday]
  }
];
