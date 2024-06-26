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
  productForm: FormGroup;

  currentPage = 1;
  itemsPerPage = 4;

  get totalPages(): number {
    return Math.ceil(this.products.length / this.itemsPerPage);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  get startIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get endIndex(): number {
    return Math.min(this.startIndex + this.itemsPerPage - 1, this.products.length - 1);
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }

  constructor(private adminService: AdminService, private productService: ProductService, private fb: FormBuilder, private router: Router) {
    this.productForm = this.fb.group({
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
      name: this.productForm.value.name,
      brand: this.productForm.value.brand,
      price: this.productForm.value.price,
      imageUrl: this.productForm.value.imageUrl,
      category: this.productForm.value.category
    }
    if (this.productForm.valid) {
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

  // updateProduct(id: string, product: any): void {
  //   this.adminService.updateProduct(id, product).subscribe(() => {
  //     this.ngOnInit();
  //   });
  // }

  updateProduct(): void {
    if (this.productForm.valid && this.selectedProduct) {
      const productId = this.selectedProduct._id;
      const updatedProduct = this.productForm.value as Product;
      this.adminService.updateProduct(productId, updatedProduct).subscribe(() => {
        this.ngOnInit();
        this.productForm.reset();
        this.selectedProduct = {} as Product;
      });
    }
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
