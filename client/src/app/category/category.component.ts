import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../product.model';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  category!: string;
  products: Product[] = [];
  brands: string[] = [];
  selectedBrand: string | null = null;
  movingElement: string = '.moving-side';
  fixedElement: string = '.fixed-side';
  t2: gsap.core.Timeline | null = null;
  isMobile: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
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

    this.route.paramMap.subscribe(params => {
      this.category = params.get('category') || '';
    });

    this.route.queryParams.subscribe(params => {
      this.selectedBrand = params['brand'] || null;
      this.loadProducts();
    });
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
    this.initializeScrollAnimations();
  }

  loadProducts(): void {
    this.productService.getProductsByFilter(this.category, this.selectedBrand ?? undefined)
      .subscribe(products => {
        this.products = products;
      });
  }
  selectBrand(brand: string) {
    this.selectedBrand = brand;
    this.onFilterChange();
  }

  onFilterChange(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        brand: this.selectedBrand
      },
      queryParamsHandling: 'merge'
    });
  }

  clearFilters(): void {
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
