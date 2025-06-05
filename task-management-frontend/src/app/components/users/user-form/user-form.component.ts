import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../../core/models/user.model';
import { UserService } from '../../../core/services/user.service';

import {
  errorAlert,
  successAlert,
} from '../../../core/models/sweet-alert.model';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  @Input() user!: User;
  userForm!: FormGroup;
  isEditMode = false;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.initForm();

    if (this.user) {
      this.userForm.patchValue(this.user);
    }
  }

  initForm(): void {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['USER', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const userData = this.userForm.value;

    if (this.user) {
      userData.id = this.user.id;
      this.userService.updateUser(userData).subscribe(
        () => {
          this.isLoading = false;
          successAlert(
            'Success',
            'The user has been successfully updated.',
          );
          this.activeModal.close();
        },
        (error: any) => {
          this.isLoading = false;
          errorAlert('Error', error);
          console.error('Error updating user:', error);
        }
      );
    } else {
      this.userService.createUser(userData).subscribe(
        () => {
          this.isLoading = false;
          successAlert('Success', 'The user has been successfully inserted.');
          this.activeModal.close();
        },
        (error: any) => {
          this.isLoading = false;
          errorAlert('Error', error);
          console.error('Error creating user:', error);
        }
      );
    }
  }
}
