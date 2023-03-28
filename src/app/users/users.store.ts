import { Injectable, InjectionToken } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { from, map, Observable } from 'rxjs';
import { User } from './user.model';

export interface UserState extends EntityState<User> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'users' })
export class UserStore extends EntityStore<UserState, User> {
  constructor() {
    super();

    // add some initial users to the store
    this.add([
      { id: Math.floor(Math.random() * 1000), name: 'Mika', active: false },
      { id: Math.floor(Math.random() * 1000), name: 'Pera', active: false },
      { id: Math.floor(Math.random() * 1000), name: 'Laza', active: false },
    ]);
  }


}