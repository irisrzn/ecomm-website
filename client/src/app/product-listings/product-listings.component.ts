import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-listings',
  templateUrl: './product-listings.component.html',
  styleUrls: ['./product-listings.component.css']
})
export class ProductListingsComponent implements OnInit {

  // products: Product[] = [];

  // constructor(private productService: ProductService) { }

  // ngOnInit(): void {
  //   this.productService.getFilteredProducts('').subscribe(filteredProducts => {
  //     this.products = filteredProducts;
  //   });
  // }

  products: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts()
      .subscribe(products => {
        this.products = products;
      });
  }
}
