import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { UserStorageService } from '../../../services/auth/user-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [ReactiveFormsModule],
})
export class LoginComponent {
  loginForm!: FormGroup;

  log: String = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [, Validators.required],
      password: [, Validators.required],
    });
  }

  onSubmit() {
    const username = this.loginForm.get('username')!.value;
    const password = this.loginForm.get('password')!.value;

    this.authService.login(username, password).subscribe(
      (res: any) => {
        this.log = JSON.stringify(res);
        if (UserStorageService.isAdminLoggedIn()) {
          this.router.navigateByUrl('admin');
          console.log('Admin login successful');
        } else if (UserStorageService.isUserLoggedIn()) {
          this.router.navigateByUrl('user');
          console.log('User login successful');
        }
      },
      (err: any) => {
        this.log = JSON.stringify(err);
      }
    );
  }
}
