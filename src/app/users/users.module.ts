import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersTableComponent } from './users-table/users-table.component';
import { AddUsersComponent } from './add-users/add-users.component';
import { UsersService } from './users.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UsersTableComponent,
    AddUsersComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [
    UsersService
  ],
  exports: [
    UsersTableComponent,
    AddUsersComponent
  ]
})
export class UsersModule { }
