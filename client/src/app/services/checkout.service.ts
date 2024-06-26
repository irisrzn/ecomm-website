import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private API_URL = 'http://localhost:3000/orders'; // Replace with your API endpoint


  constructor(private http: HttpClient, private cartService: CartService) { }

  placeOrder(orderData: any): Observable<any> {
    if (!orderData) {
      console.log("orderdata is missing");
      console.log(orderData);
      
    }
    this.cartService.updateCartItemCount();
    return this.http.post(this.API_URL, orderData);
  }

  getOrderHistory(): Observable<any> {
    return this.http.get(this.API_URL);
  }

  updateOrderStatus(id: string, status: string): Observable<any> {
    return this.http.put(`${this.API_URL}/${id}/status`, { status });
  }
}
