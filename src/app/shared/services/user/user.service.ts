import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { SuccessNotificationComponent } from '../../components/success-notification/success-notification.component';
import { GameShow } from '../../models/game-show';
import { ShowScheduleViewModel, ScheduleTime } from '../../models/show-schedule';
import { User } from '../../models/user';



import { UserDataService } from './user-data.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUser = new BehaviorSubject<User>(null);
  favoriteShows = new BehaviorSubject<GameShow[]>([]);
  scheduledShows = new BehaviorSubject<ShowScheduleViewModel[]>([]);

  constructor(private userDataService: UserDataService, private snackBar: MatSnackBar) {}

  getCurrentUser(): Observable<User> {
    return this.currentUser.asObservable();
  }

  getUsersFavoriteShows(): Observable<GameShow[]> {
    return this.favoriteShows.asObservable();
  }

  getScheduledShows(): Observable<ShowScheduleViewModel[]> {
    return this.scheduledShows.asObservable();
  }

  getIsUserAuthorized(): boolean {
    let currentUser = this.currentUser.getValue();

    if (!currentUser) {
      const localStorageUser = localStorage.getItem('user');
      if (localStorageUser) {
        const userObject = JSON.parse(localStorageUser);
        this.currentUser.next(userObject);
        currentUser = userObject;
      }
    }

    return !!currentUser;
  }

  loginUser(userName: string): Observable<User> {
    return this.userDataService.getUser(userName).pipe(
      tap((user: User) => {
        this.currentUser.next(user);
        localStorage.setItem('user', JSON.stringify(user));
      })
    );
  }

  createUser(user: User): Observable<User> {
    return this.userDataService.createUser(user);
  }

  updateFavoriteShows(shows: GameShow[]): void {
    this.favoriteShows.next(shows);
  }

  addShowToSchedule(show: GameShow, schedule: ScheduleTime): void {
    const scheduledShows = [...this.scheduledShows.value];
    const showIndex = scheduledShows.findIndex((s) => s.showId === show.showId && s.day === schedule.day);

    if (showIndex === -1) {
      scheduledShows.push({
        showId: show.showId,
        title: show.title,
        day: schedule.day,
        time: schedule.time,
      });

      this.scheduledShows.next(scheduledShows);

      this.openSnackBar();
    }
  }

  removeShowFromSchedule(scheduledShow: ShowScheduleViewModel): void {
    const scheduledShows = [...this.scheduledShows.value];
    const showIndex = scheduledShows.findIndex((s) => s.showId === scheduledShow.showId && s.day === scheduledShow.day);
    if (showIndex > -1) {
      scheduledShows.splice(showIndex, 1);
      this.scheduledShows.next(scheduledShows);
    }
  }

  private openSnackBar(): void {
    this.snackBar.openFromComponent(SuccessNotificationComponent, {
      duration: 5000,
    });
  }
}
