import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { RegisterError } from '../../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { registerUserRequest } from '../../store/users.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements AfterViewInit, OnDestroy {
  @ViewChild('form') form!: NgForm;
  error: Observable<null | RegisterError>;
  errSubscription!: Subscription;
  loading: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.error = store.select( state => state.users.registerError);
    this.loading = store.select( state => state.users.registerLoading);
  }

  ngAfterViewInit(): void {
    this.errSubscription = this.error.subscribe(error => {
      if (error) {
        const message = error.errors.email.message;
        this.form.form.get('email')?.setErrors({serverError: message});
      } else {
        this.form.form.get('email')?.setErrors({});
      }
    });
  }

  onSubmit() {
    this.store.dispatch(registerUserRequest({userData: this.form.value}));
  }

  ngOnDestroy() {
    this.errSubscription.unsubscribe();
  }
}
