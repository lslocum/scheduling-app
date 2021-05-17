import { getDefaultUser } from '../app/shared/models/user';
import { User } from '../app/shared/models/user';

export const usersData: User[] = [
  getDefaultUser(
    {
      userName: 't-bek',
      firstName: 'Alex',
      lastName: 'Trebek',
      email: 'atrebek@mustbeaquestion.com'
    }),
    getDefaultUser({
      userName: 'b-dogg',
      firstName: 'Bob',
      lastName: 'Barker',
      email: 'bbarker@comeondown.com'
    }),
    getDefaultUser({
      userName: 'p-jak',
      firstName: 'Pat',
      lastName: 'Sajak',
      email: 'psajak@thewheel.com'
    }),
    getDefaultUser({
      userName: 'reggie',
      firstName: 'Regis',
      lastName: 'Philbin',
      email: 'rphilbin@finalanswer.com'
    })
];
