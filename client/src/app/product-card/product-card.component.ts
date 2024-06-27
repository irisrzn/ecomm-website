import { Component, ElementRef, Input, Renderer2 } from '@angular/core';
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

  constructor(private cartService: CartService, private productService: ProductService, private elementRef: ElementRef, private renderer: Renderer2) {
    this.product = {} as Product;
  }

  ngOnInit(): void {
      setTimeout(() => {
        this.addRippleEffect();
      }, 0);
  }

  private addRippleEffect(): void {
    const buttons: NodeListOf<HTMLButtonElement> = this.elementRef.nativeElement.querySelectorAll('.ripple-button');
    
    buttons.forEach((button: HTMLButtonElement) => {
      this.renderer.listen(button, 'click', (event: MouseEvent) => {
        this.createRipple(event, button);
      });
    });
  }

  private createRipple(event: MouseEvent, button: HTMLButtonElement): void {
    const x = event.clientX;
    const y = event.clientY;

    const buttonRect = button.getBoundingClientRect();
    const buttonTop = buttonRect.top;
    const buttonLeft = buttonRect.left;

    const xInside = x - buttonLeft;
    const yInside = y - buttonTop;

    const circle = this.renderer.createElement('span');
    this.renderer.addClass(circle, 'circle');
    this.renderer.setStyle(circle, 'top', `${yInside}px`);
    this.renderer.setStyle(circle, 'left', `${xInside}px`);

    this.renderer.appendChild(button, circle);

    setTimeout(() => {
      this.renderer.removeChild(button, circle);
    }, 500);
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
