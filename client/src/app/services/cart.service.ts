import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:3000';
  private cartItemCount = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) { }

  addToCart(productId: string, quantity: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/cart/add`, { productId, quantity }).pipe(
      tap(() => {
        this.updateCartItemCount();
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
    return this.http.get(`${this.apiUrl}/cart`);
  }

  removeFromCart(productId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/cart/remove`, { productId });
  }
}
