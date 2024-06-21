import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  statistics: any = {
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
  };

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getStatistics().subscribe(data => {
      this.statistics = data;
    });
  }
}
