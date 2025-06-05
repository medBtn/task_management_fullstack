import { CommonModule } from "@angular/common";
import { Component, OnInit, Input } from "@angular/core";
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { User } from "../../../core/models/user.model";
import { UserService } from "../../../core/services/user.service";


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

    this.isLoading = true;
    const userData = this.userForm.value;

    if (this.user) {
      userData.id = this.user.id;
      this.userService.updateUser(userData).subscribe(
        () => {
          this.isLoading = false;
          this.activeModal.close()
        },
        (error:any) => {
          this.isLoading = false;
          console.error('Error updating user:', error);
        }
      );
    } else {
      this.userService.createUser(userData).subscribe(
        () => {
          this.isLoading = false;
          this.activeModal.close()
        },
        (error:any) => {
          this.isLoading = false;
          console.error('Error creating user:', error);
        }
      );
    }
  }
}
