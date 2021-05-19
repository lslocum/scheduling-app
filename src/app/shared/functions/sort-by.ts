import { GameShow } from '../models/game-show';
import { ShowScheduleViewModel } from '../models/show-schedule';

export function sortShowScheduleByTime(a: ShowScheduleViewModel, b: ShowScheduleViewModel): number {
  return a.time === b.time ? 0 : a.time > b.time ? 1 : -1;
}

export function sortGameShowByTitle(a: GameShow, b: GameShow): number {
  return a.title === b.title ? 0 : a.title > b.title ? 1 : -1;
}
