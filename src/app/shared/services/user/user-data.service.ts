import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { usersData } from '../../../../data/users.data'
import { getDefaultUser } from '../../models/user';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  fakeUserDatabase = [...usersData];

  getUsers(): Observable<User[]> {
    return of(this.fakeUserDatabase);
  }

  getUser(userName: string): Observable<User> {
    return of(this.fakeUserDatabase.find(u => u.userName === userName));
  }

  createUser(user: User): Observable<User> {
    const newUser = getDefaultUser(user);
    this.fakeUserDatabase.push(newUser);

    return of(newUser);
  }

  updateUser(user: User): Observable<User> {
    this.fakeUserDatabase = this.fakeUserDatabase.map(u =>
      u.userId === user.userId ? user : u
    );

    return of(user);
  }

  deleteUser(user: User): Observable<string> {
    const removedUserIndex = this.fakeUserDatabase.findIndex(
      u => u.userId === user.userId
    );
    this.fakeUserDatabase.splice(removedUserIndex, 1);

    return of(`User ${user.userId} successfully removed.`);
  }
}
