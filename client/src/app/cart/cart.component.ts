import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;
  error: string | null = null;

  constructor(private cartService: CartService) { }

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
    if (quantity < 1) {
      this.removeItem(productId);
    } else {
      this.cartService.addToCart(productId, quantity).subscribe(
        data => {
          this.cartItems = data.items;
          this.calculateTotal();
        },
        err => {
          this.error = err.error.message;
        }
      );
    }
  }

  // updateQuantity(productId: string, quantity: number): void {
  //   const itemToUpdate = this.cartItems.find(item => item.product._id === productId);

  //   if (!itemToUpdate) {
  //     return;
  //   }

  //   const updatedQuantity = itemToUpdate.quantity + quantity;

  //   if (updatedQuantity < 1) {
  //     this.removeItem(productId);
  //     return;
  //   }

  //   // Optimistic UI update
  //   this.calculateTotal();

  //   // Disable buttons
  //   itemToUpdate.updating = true;

  //   this.cartService.addToCart(productId, updatedQuantity).subscribe(
  //     data => {
  //       this.cartItems = data.items;
  //       this.calculateTotal();
  //       itemToUpdate.updating = false; // Enable buttons
  //     },
  //     err => {
  //       this.error = err.error.message;
  //       // Revert UI changes on error
  //       this.loadCart(); // Reload the cart from the server to revert changes
  //     }
  //   );
  // }

  removeItem(productId: string): void {
    this.cartService.removeFromCart(productId).subscribe(
      data => {
        this.cartItems = data.items;
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
}
