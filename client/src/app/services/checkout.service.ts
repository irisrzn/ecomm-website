import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private API_URL = 'http://localhost:3000/orders'; // Replace with your API endpoint


  constructor(private http: HttpClient) { }

  placeOrder(orderData: any): Observable<any> {
    if (!orderData) {
      console.log("orderdata is missing");
      console.log(orderData);
      
    }
    return this.http.post(this.API_URL, orderData);
  }

  getOrderHistory(): Observable<any> {
    return this.http.get(this.API_URL);
  }
}
