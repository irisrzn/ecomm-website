import { Component } from '@angular/core';
import { Product } from '../product.model';
import { CartService } from '../cart.service';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartItems: { product: Product, quantity: number }[] = [];
  totalPrice: number = 0;


  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.updateTotalPrice();
  }

  removeItem(productId: string): void {
    this.cartService.removeFromCart(productId);
    this.cartItems = this.cartService.getCartItems();
    this.updateTotalPrice();
  }

  updateQuantity(productId: string, quantity: number): void {
    this.cartService.updateCartItemQuantity(productId, quantity);
    this.cartItems = this.cartService.getCartItems();
    this.updateTotalPrice();
  }

  updateTotalPrice(): void {
    this.totalPrice = this.cartService.getTotalPrice();
  }
}
