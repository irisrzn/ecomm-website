import { Component, Input } from '@angular/core';
import { Product } from '../product.model';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product: Product;

  constructor(private cartService: CartService, private productService: ProductService) {
    this.product = {} as Product;
  }

  addToCart(event: Event, productId: string, quantity: number) {
    event.stopPropagation();
    event.preventDefault();
    this.cartService.addToCart(productId, quantity).subscribe(
      response => {
        console.log('Product added to cart', response);
      },
      error => {
        console.error('Error adding product to cart', error);
      }
    );
  }

  getImageUrl(imageUrl: string): string {
    return this.productService.getImageUrl(imageUrl);
  }
}
