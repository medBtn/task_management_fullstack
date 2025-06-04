import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserStorageService } from '../../core/services/auth/user-storage.service';
import { User } from '../../core/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  currentUser!: User;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.currentUser = UserStorageService.getUser();
  }
  logout() {
    UserStorageService.signOut();
    this.router.navigateByUrl('/login');
  }
}
