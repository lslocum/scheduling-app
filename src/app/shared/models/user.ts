export interface User {
  userId: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
}

export function getDefaultUser(user?: Partial<User>): User {
  return {
    userId: `${Math.random()}-${Math.random()}-${Math.random()}-${Math.random()}`,
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    ...user
  };
}
