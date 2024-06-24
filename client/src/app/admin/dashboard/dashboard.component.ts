import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { Chart } from 'chart.js/auto';

interface CategoryItem {
  category: string;
  totalQuantity: number;
}

interface BrandItem {
  brand: string;
  totalQuantity: number;
}

interface SalesItem {
  month: number;
  year: number;
  totalRevenue: number;
}

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
    itemsByCategory: [],
    itemsByBrand: [],
    salesByMonth: []
  };

  // Chart data and configuration
  categoryChart: any;
  brandChart: any;
  salesChart: any;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getStatistics().subscribe(data => {
      this.statistics = data;
      this.createCharts();
    });
  }

  createCharts(): void {
    this.createCategoryChart();
    this.createBrandChart();
    this.createSalesChart();
  }

  createCategoryChart(): void {
    const categoryLabels = this.statistics.itemsByCategory.map((item: CategoryItem) => item.category);
    const categoryData = this.statistics.itemsByCategory.map((item: CategoryItem) => item.totalQuantity);

    this.categoryChart = new Chart('CategoryChart', {
      type: 'doughnut',
      data: {
        labels: categoryLabels,
        datasets: [{
          label: 'Items Ordered by Category',
          data: categoryData,
          backgroundColor: [
            'rgba(20, 97, 82, 0.2)',
            'rgba(255, 236, 92, 0.2)',
            'rgba(255, 90, 51, 0.2)',
            'rgba(180, 207, 102, 0.2)',
            'rgba(68, 128, 63, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(20, 97, 82, 1)',
            'rgba(255, 236, 92, 1)',
            'rgba(255, 90, 51, 1)',
            'rgba(180, 207, 102, 1)',
            'rgba(68, 128, 63, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        aspectRatio: 2.5,
        plugins: {
          legend: {
            position: 'bottom' // Position legend on the right
          }
        }
      }
    });
  }

  createBrandChart(): void {
    const brandLabels = this.statistics.itemsByBrand.map((item: BrandItem) => item.brand);
    const brandData = this.statistics.itemsByBrand.map((item: BrandItem) => item.totalQuantity);

    this.brandChart = new Chart('BrandChart', {
      type: 'pie',
      data: {
        labels: brandLabels,
        datasets: [{
          label: 'Items Ordered by Brand',
          data: brandData,
          backgroundColor: [
            'rgba(180, 207, 102, 0.2)',
            'rgba(68, 128, 63, 0.2)',
            'rgba(20, 97, 82, 0.2)',
            'rgba(255, 236, 92, 0.2)',
            'rgba(255, 90, 51, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(180, 207, 102, 1)',
            'rgba(68, 128, 63, 1)',
            'rgba(20, 97, 82, 1)',
            'rgba(255, 236, 92, 1)',
            'rgba(255, 90, 51, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        aspectRatio: 2.5,
        plugins: {
          legend: {
            position: 'bottom' // Position legend on the right
          }
        }
      }
    });
  }

  createSalesChart(): void {
    const salesLabels = this.statistics.salesByMonth.map((item: SalesItem) => `${item.month}-${item.year}`);
    const salesData = this.statistics.salesByMonth.map((item: SalesItem) => item.totalRevenue);

    this.salesChart = new Chart('SalesChart', {
      type: 'line',
      data: {
        labels: salesLabels,
        datasets: [{
          label: 'Sales by Month',
          data: salesData,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 1,
          fill: false
        }]
      },
      options: {
        responsive: true,
        aspectRatio: 2.5,
        plugins: {
          legend: {
            position: 'bottom' // Position legend on the right
          }
        }
      }
    });
  }
}
