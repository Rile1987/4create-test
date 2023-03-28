import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user.model';
import { UsersQuery } from './users.query';
import { UserStore } from './users.store';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  private modalState$: BehaviorSubject<'open' | 'close'> = new BehaviorSubject<'open' | 'close'>('close')

  constructor(private usersStore: UserStore, private usersQuery: UsersQuery ) {}

  watch(): Observable<'open' | 'close'> {
    return this.modalState$.asObservable();
  }

  open() {
    this.modalState$.next('open');
  }

  close() {
    this.modalState$.next('close');
  }

  toggleActive(userId: ID) {
    const user = this.usersQuery.getEntity(userId);
    if (!user) {
      return;
    }
    const updatedUser = { ...user, active: !user.active };
    this.usersStore.update(userId, updatedUser);
  }

  addUser(user: User) {
    this.usersQuery.addUser(user);
  }
}
