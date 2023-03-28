import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../user.model';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent implements OnInit {
  @Input() isOpen: boolean = false;
  form: FormGroup;
  name: string | undefined;

  display$: Observable<'open' | 'close'>;

  constructor(
      private usersService: UsersService,
      private fb: FormBuilder
  ) {
    this.display$ = this.usersService.watch();
    this.form = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.display$ = this.usersService.watch();
    this.form = this.fb.group({
      name: ['', Validators.required]
    });
  }

  onSubmit() {
    const user: User = { id: Math.floor(Math.random() * 1000), name: this.name as string, active: false };
    this.usersService.addUser(user);
    this.usersService.close();
    this.name = undefined;
  }

  close() {
    this.usersService.close();
  }

}