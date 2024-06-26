import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../product.model';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-product-listings',
  templateUrl: './product-listings.component.html',
  styleUrls: ['./product-listings.component.css']
})
export class ProductListingsComponent implements OnInit {

  products: Product[] = [];
  categories = [
    { name: 'holds', image: 'holds.png' },
    { name: 'volumes', image: 'volumes.png' },
    { name: 'macros', image: 'macros.png' }
  ];
  brands: string[] = [];
  selectedCategory: string | null = null;
  selectedBrand: string | null = null;
  movingElement: string = '.moving-side';
  fixedElement: string = '.fixed-side';
  t2: gsap.core.Timeline | null = null;
  isMobile: boolean = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { 
    this.checkScreenSize();
  }
  
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 992;
  }
  
  ngOnInit(): void {
    this.productService.getBrands().subscribe(brands => {
      this.brands = brands;
    });

    this.route.queryParams.subscribe(params => {
      this.selectedCategory = params['category'] || null;
      this.selectedBrand = params['brand'] || null;
      this.loadProducts();
    });
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
    this.initializeScrollAnimations();
  }

  loadProducts(): void {
    this.productService.getProductsByFilter(this.selectedCategory ?? undefined, this.selectedBrand ?? undefined)
      .subscribe(products => {
        this.products = products;
      });
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.onFilterChange();
  }

  selectBrand(brand: string) {
    this.selectedBrand = brand;
    this.onFilterChange();
  }

  onFilterChange(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        category: this.selectedCategory,
        brand: this.selectedBrand
      },
      queryParamsHandling: 'merge'
    });
  }

  clearFilters(): void {
    this.selectedCategory = null;
    this.selectedBrand = null;
    this.onFilterChange();
  }

  initializeScrollAnimations() {
    const movingElement = this.movingElement;
    const fixedElement = this.fixedElement;

    ScrollTrigger.matchMedia({
      // desktop only
      "(min-width: 992px)": () => {
        setTimeout(() => {
          const sectionElement = document.querySelector(movingElement) as HTMLElement;
          const fixedElementSelector = document.querySelector(fixedElement) as HTMLElement;

          if (sectionElement && fixedElementSelector) {

            const leftPartHeight = sectionElement.offsetHeight;

            this.t2 = gsap.timeline({
              scrollTrigger: {
                trigger: fixedElement,
                pin: true, // pin the trigger element while active
                start: "-96px top", // when the top of the trigger hits the top of the viewport
                end: () => leftPartHeight + "px bottom",
                // markers: true,
              }
            });

            if (this.t2.scrollTrigger) {
              this.t2.scrollTrigger.refresh();
            }
          }
        }, 100);
      }
    });
  }
  

}
