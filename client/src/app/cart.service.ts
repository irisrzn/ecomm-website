import { Injectable } from '@angular/core';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly CART_KEY = 'cart';

  private cartItems: { product: Product, quantity: number }[] = [];

  constructor() {
    this.loadCartItems();
  }

  addToCart(product: Product): void {
    const existingItem = this.cartItems.find(item => item.product._id === product._id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push({ product, quantity: 1 });
    }
    this.saveCartItems();
  }

  removeFromCart(productId: string): void {
    const index = this.cartItems.findIndex(item => item.product._id === productId);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.saveCartItems();
    }
  }

  updateCartItemQuantity(productId: string, quantity: number): void {
    const item = this.cartItems.find(item => item.product._id === productId);
    if (item) {
      item.quantity = quantity;
      this.saveCartItems();
    }
  }

  getCartItems(): { product: Product, quantity: number }[] {
    return this.cartItems;
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  private loadCartItems(): void {
    const storedCartItems = localStorage.getItem(this.CART_KEY);
    if (storedCartItems) {
      this.cartItems = JSON.parse(storedCartItems);
    }
  }

  private saveCartItems(): void {
    localStorage.setItem(this.CART_KEY, JSON.stringify(this.cartItems));
  }

  logCartContents(): void {
    console.log('Cart contents:', this.cartItems);
  }
}
