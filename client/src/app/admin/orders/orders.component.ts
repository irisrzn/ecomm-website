import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { CheckoutService } from '../../services/checkout.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  selectedOrder: any = null;

  currentPage = 1;
  itemsPerPage = 4;

  get totalPages(): number {
    return Math.ceil(this.orders.length / this.itemsPerPage);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  get startIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get endIndex(): number {
    return Math.min(this.startIndex + this.itemsPerPage - 1, this.orders.length - 1);
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }


  constructor(private adminService: AdminService, private orderService: CheckoutService) { }

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.adminService.getAllOrders().subscribe(data => {
      this.orders = data;
    });
  }

  updateOrderStatus(orderId: string, status: string): void {
    if (orderId) {
      this.orderService.updateOrderStatus(orderId, status).subscribe(
        response => {
          console.log('Order status updated successfully:', response);
          this.fetchOrders();
        },
        error => {
          console.error('Failed to update order status:', error);
        }
      );
    }
  }
}
