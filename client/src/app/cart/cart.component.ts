import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;
  error: string | null = null;

  constructor(private cartService: CartService, private productService: ProductService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.getCart().subscribe(
      data => {
        this.cartItems = data.items;
        this.calculateTotal();
      },
      err => {
        this.error = err.error.message;
      }
    );
  }

  updateQuantity(productId: string, quantity: number): void {
    const itemIndex = this.cartItems.findIndex(item => item.product._id === productId);
    const newQuantity = this.cartItems[itemIndex].quantity + quantity;

    console.log("itemIndex: " + itemIndex);
    console.log("newQuantity: " + newQuantity);
    
    if (this.cartItems[itemIndex].quantity < 1) {
      this.removeItem(productId);
    } else {
      this.cartService.addToCart(productId, quantity).subscribe(
        data => {
          // this.cartItems = data.items;
          this.cartItems[itemIndex].quantity = newQuantity;
          this.calculateTotal();
        },
        err => {
          this.error = err.error.message;
        }
      );
    }
  }

  removeItem(productId: string): void {
    this.cartService.removeFromCart(productId).subscribe(
      data => {
        // this.cartItems = data.items;
        this.loadCart();
        this.calculateTotal();
      },
      err => {
        this.error = err.error.message;
      }
    );
  }

  calculateTotal(): void {
    this.totalPrice = this.cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  getImageUrl(imageUrl: string): string {
    return this.productService.getImageUrl(imageUrl);
  }
}
