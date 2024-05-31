import { Component, Input } from '@angular/core';
import { Product } from '../product.model';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product: Product;

  constructor(private cartService: CartService) {
    this.product = {} as Product;
  }

  addToCart(productId: string, quantity: number) {
    this.cartService.addToCart(productId, quantity).subscribe(
      response => {
        console.log('Product added to cart', response);
      },
      error => {
        console.error('Error adding product to cart', error);
      }
    );
  }
}
