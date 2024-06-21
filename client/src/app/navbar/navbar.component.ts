import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  username: string | null;
  isLoggedIn: boolean = false;
  cartItemCount: number = 0;
  showPopup: boolean = false;

  constructor(private authService: AuthService, private cartService: CartService, private router: Router) {
    this.username = localStorage.getItem('username');
  }

  ngOnInit(): void {
    this.authService.getLoggedIn().subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
      if (loggedIn) {
        this.updateCartItemCount();
        this.cartService.getCartItemCount().subscribe((count: number) => {
          this.cartItemCount = count;
        });
      } else {
        this.cartItemCount = 0;
      }
    });

    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd) 
    ).subscribe((event: NavigationEnd) => { 
      if (event.url === '/cart') {
        this.updateCartItemCount();
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.cartItemCount = 0;
  }

  updateCartItemCount(): void {
    this.cartService.updateCartItemCount();
  }
}
