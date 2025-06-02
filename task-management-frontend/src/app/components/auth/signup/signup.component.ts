import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  imports: [ReactiveFormsModule],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  log: String = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: [, Validators.required],
      email: [, Validators.required],
      password: [, Validators.required],
    });
  }

  onSubmit() {
    const user = this.signupForm.value;
    user.role = 'USER';

    this.authService.register(user).subscribe(
      (res:any) => {
        this.log = JSON.stringify(res);
        this.router.navigateByUrl('/login');
      },
      (err:any) => {
        this.log = JSON.stringify(err);
      }
    );
  }
}
