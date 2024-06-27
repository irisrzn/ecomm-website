import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  products: Product[] = [];
  categories = [
    { name: 'holds', image: 'holds.png' },
    { name: 'volumes', image: 'volumes.png' },
    { name: 'macros', image: 'macros.png' }
  ];

  slideConfig = {
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    dots: true,
    infinite: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  constructor(private productService: ProductService, private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.productService.getProducts()
      .subscribe(products => {
        this.products = products;
      });

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

  getImageUrl(imageUrl: string): string {
    return this.productService.getImageUrl(imageUrl);
  }

  // @HostListener('mouseenter', ['$event'])
  // createRipple(event: MouseEvent) {
  //   const button = this.el.nativeElement.querySelector('.ripple-button');

  //   console.log(button);

  //   const ripple = document.createElement('span');
  //   ripple.classList.add('circle');
  //   const rect = button.getBoundingClientRect();
  //   const size = Math.max(rect.width, rect.height);
  //   const x = event.clientX - rect.left - size / 2;
  //   const y = event.clientY - rect.top - size / 2;

  //   ripple.style.width = ripple.style.height = `${size}px`;
  //   ripple.style.left = `${x}px`;
  //   ripple.style.top = `${y}px`;
  //   ripple.classList.add('ripple');

  //   button.appendChild(ripple);

  //   setTimeout(() => {
  //     ripple.remove();
  //   }, 600);
  // }
}
