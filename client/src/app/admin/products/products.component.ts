import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products!: any[];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getAllProducts().subscribe(data => {
      this.products = data;
    });
  }

  createProduct(product: any): void {
    this.adminService.createProduct(product).subscribe(() => {
      this.ngOnInit();
    });
  }

  updateProduct(id: string, product: any): void {
    this.adminService.updateProduct(id, product).subscribe(() => {
      this.ngOnInit();
    });
  }

  deleteProduct(id: string): void {
    this.adminService.deleteProduct(id).subscribe(() => {
      this.ngOnInit();
    });
  }
}
