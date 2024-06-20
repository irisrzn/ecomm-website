import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders!: any[];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getAllOrders().subscribe(data => {
      this.orders = data;
    });
  }
}
