import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  username: string | null;
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) {
    this.username = localStorage.getItem('username');

  }

  ngOnInit(): void {
    // Subscribe to changes in the authentication status
    this.authService.getLoggedIn().subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
