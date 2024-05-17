import { Component, Input } from '@angular/core';
import { Product } from '../product.model';
import { CartService } from '../cart.service';

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

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    this.cartService.logCartContents();
    alert('Product added to cart!');
  }
}
