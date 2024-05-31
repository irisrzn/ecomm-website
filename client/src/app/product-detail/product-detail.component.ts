import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../product.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  // product: Product | null = null;

  // constructor(
  //   private route: ActivatedRoute,
  //   private productService: ProductService
  // ) { }

  // ngOnInit(): void {
  //   const productId = this.route.snapshot.paramMap.get('id');
  //   if (productId) {
  //     this.productService.getProductById(productId)
  //       .subscribe(product => {
  //         this.product = product;
  //       });
  //   }
  // }

  product: Product | null = null;
  private productSubscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    // Retrieve product ID from URL parameters
    const productId = this.route.snapshot.paramMap.get('id');

    if (productId) {
      // Fetch product details from the backend API
      this.productSubscription = this.productService.getProductById(productId)
        .subscribe({
          next: (product: Product) => {
            this.product = product;
          },
          error: (error) => {
            console.error('Error fetching product details:', error);
            // Handle error (e.g., display error message)
          }
        });
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }
}
