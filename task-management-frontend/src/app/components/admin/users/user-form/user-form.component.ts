import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../core/services/user.service';
import { User } from '../../../../core/models/user.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

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
  loading = false;
  error = '';
  success = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public activeModal: NgbActiveModal,
    private router: Router
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

    this.loading = true;
    const userData = this.userForm.value;

    if (this.user) {
      userData.id = this.user.id;
      this.userService.updateUser(userData).subscribe(
        () => {
          this.success = 'User updated successfully';
          this.loading = false;
          setTimeout(() => {
            this.router.navigate(['/admin']);
          }, 1500);
        },
        (error) => {
          this.error = 'Failed to update user';
          this.loading = false;
          console.error('Error updating user:', error);
        }
      );
    } else {
      this.userService.createUser(userData).subscribe(
        () => {
          this.success = 'User created successfully';
          this.loading = false;
          setTimeout(() => {
            this.router.navigate(['/admin']);
          }, 1500);
        },
        (error) => {
          this.error = 'Failed to create user';
          this.loading = false;
          console.error('Error creating user:', error);
        }
      );
    }
  }
}
