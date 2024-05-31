import { Component } from '@angular/core';
import { CheckoutService } from '../services/checkout.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent {
  orders: any[] = [];

  constructor(private orderService: CheckoutService) {}

  ngOnInit(): void {
    this.loadOrderHistory();
  }

  loadOrderHistory(): void {
    this.orderService.getOrderHistory().subscribe(
      (response: any[]) => {
        this.orders = response;
      },
      error => {
        console.error('Error fetching order history', error);
      }
    );
  }
}
