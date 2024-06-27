import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { AlertService } from './alert.service';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:3000';
  private cartItemCount = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient, private authService: AuthService, private alertService: AlertService, private loadingService: LoadingService) {
    this.updateCartItemCount();
  }

  addToCart(productId: string, quantity: number): Observable<any> {
    this.loadingService.show();

    return this.http.post(`${this.apiUrl}/cart/add`, { productId, quantity }).pipe(
      tap({
        next: () => {
          this.updateCartItemCount();
          this.loadingService.hide();
        },
        error: () => {
          this.alertService.showAlert('Please log in to add items to the cart.');
          this.loadingService.hide();
        }
      })
    );
  }


  getCartItemCount(): Observable<number> {
    return this.cartItemCount.asObservable();
  }

  updateCartItemCount(): void {
    this.http.get<any>(`${this.apiUrl}/cart`).subscribe(cart => {
      const itemCount = cart.items.reduce((count: number, item: any) => count + item.quantity, 0);
      this.cartItemCount.next(itemCount);
    });
  }

  getCart(): Observable<any> {
    this.loadingService.show();
    return this.http.get(`${this.apiUrl}/cart`).pipe(
      finalize(() => this.loadingService.hide())
    );
  }

  removeFromCart(productId: string): Observable<any> {
    this.loadingService.show();
    return this.http.post(`${this.apiUrl}/cart/remove`, { productId }).pipe(
      finalize(() => this.loadingService.hide())
    );
  }
}
