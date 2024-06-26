import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.css'
})
export class AdminNavbarComponent {
  username: string | null;
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private cartService: CartService, private router: Router) {
    this.username = localStorage.getItem('username');
  }

  ngOnInit(): void {
    this.authService.getLoggedIn().subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    });

  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
