import { Injectable } from '@angular/core';
import { ID, QueryEntity } from '@datorama/akita';
import { from, Observable } from 'rxjs';
import { User } from './user.model';
import { UserState, UserStore } from './users.store';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UsersQuery extends QueryEntity<UserState, User> {
  constructor(protected override store: UserStore) {
    super(store);
  }

  override getEntity(userId: ID): User | undefined {
    const users = this.store.getValue();
    return users.entities?.[userId];
  }

  canAddUser(): Observable<boolean> {
    return this.selectAll().pipe(
      map(users => {
        if (users.length < 5) {
          return !users.every(user => user.active);
        }
        return true;
      }),
      map(result => !!result)
    );
  }

  addUser(user: User) {
    const newUser = { id: Math.floor(Math.random() * 1000), name: user.name, active: false };
    this.store.add(newUser);
  }
}