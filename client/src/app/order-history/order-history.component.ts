import { Component, Input } from '@angular/core';
import { CheckoutService } from '../services/checkout.service';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent {
  orders: any[] = [];
  orderItems: any[] = [];
  isCollapsed: boolean[] = [];

  constructor(private orderService: CheckoutService, private productService: ProductService) { }

  ngOnInit(): void {
    this.loadOrderHistory();
  }

  loadOrderHistory(): void {
    this.orderService.getOrderHistory().subscribe(
      (response: any[]) => {
        this.orders = response;
        // this.orderItems = response.items;
      },
      error => {
        console.error('Error fetching order history', error);
      }
    );
  }

  // loadOrderHistory(): void {
  //   this.orderService.getOrderHistory().subscribe(
  //     data => {
  //       this.orders = data;
  //       this.orderItems = data.items;
  //       console.log("data items:" + data);
        
  //     },
  //     error => {
  //       console.error('Error fetching order history', error);
  //     }
  //   );
  // }

  getImageUrl(imageUrl: string): string {
    return this.productService.getImageUrl(imageUrl);
  }

  toggleIcon(index: number): void {
    this.isCollapsed[index] = !this.isCollapsed[index];
  }

}
