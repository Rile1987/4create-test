import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user.model';
import { UsersQuery } from '../users.query';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent  {
  users$: Observable<User[]>;
  canAddUser$: Observable<boolean>;

  constructor(
    private usersService: UsersService,
    private usersQuery: UsersQuery,
  ) {
    this.users$ = this.usersQuery.selectAll();
    this.canAddUser$ = this.usersQuery.canAddUser();
  }

  toggleActive(user: User) {
    this.usersService.toggleActive(user.id);
  }

  openAddUserModal() {
    this.usersService.open();
  }
}
