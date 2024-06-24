import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Product } from '../../product.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products!: any[];
  selectedProduct!: Product;
  newProductForm: FormGroup;

  constructor(private adminService: AdminService, private productService: ProductService, private fb: FormBuilder, private router: Router) {
    this.newProductForm = this.fb.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      imageUrl: ['', Validators.required],
      category: ['', Validators.required]
    })
  }

  onSubmit() {
    const newProduct: Product = {
      _id: '',
      name: this.newProductForm.value.name,
      brand: this.newProductForm.value.brand,
      price: this.newProductForm.value.price,
      imageUrl: this.newProductForm.value.imageUrl,
      category: this.newProductForm.value.category
    }
    if (this.newProductForm.valid) {
      this.adminService.createProduct(newProduct).subscribe(
        response => {
          console.log('Product added successfully', response);
        },
        error => {
          console.error('Failed', error.message);
        }
      )
    }
  }

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

  getImageUrl(imageUrl: string): string {
    return this.productService.getImageUrl(imageUrl);
  }
}
