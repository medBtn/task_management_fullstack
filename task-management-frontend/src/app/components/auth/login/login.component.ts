import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { UserStorageService } from '../../../core/services/auth/user-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [ReactiveFormsModule],
})
export class LoginComponent {
  loginForm!: FormGroup;
  isLoading = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {

    if (UserStorageService.isAdminLoggedIn()) {
      this.router.navigateByUrl('admin');
    } else if (UserStorageService.isUserLoggedIn()) {
      this.router.navigateByUrl('user');
    }

    this.loginForm = this.fb.group({
      username: [, Validators.required],
      password: [, Validators.required],
    });
  }

  onSubmit() {
    this.isLoading = true;
    const username = this.loginForm.get('username')!.value;
    const password = this.loginForm.get('password')!.value;

    this.authService.login(username, password).subscribe(
      (res: any) => {
        if (UserStorageService.isAdminLoggedIn()) {
          this.router.navigateByUrl('admin');
        } else if (UserStorageService.isUserLoggedIn()) {
          this.router.navigateByUrl('user');
        }
        this.isLoading = false;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
