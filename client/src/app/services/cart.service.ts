import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  addToCart(productId: string, quantity: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/cart/add`, { productId, quantity });
  }

  getCart(): Observable<any> {
    return this.http.get(`${this.apiUrl}/cart`);
  }

  removeFromCart(productId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/cart/remove`, { productId });
  }
}
