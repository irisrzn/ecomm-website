import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../product.model';
import { LoadingService } from './loading.service';
import { finalize } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private baseUrl = 'http://localhost:3000/api';

    constructor(private http: HttpClient, private loadingService: LoadingService) { }

    addProduct(product: Product): Observable<Product> {
        const url = `${this.baseUrl}/products`;
        return this.http.post<Product>(url, product);
    }

    getProducts(): Observable<Product[]> {
        this.loadingService.show();
        const url = `${this.baseUrl}/products`;
        return this.http.get<Product[]>(url).pipe(
            finalize(() => this.loadingService.hide())
        );
    }

    getProductById(id: string): Observable<Product> {
        this.loadingService.show();
        const url = `${this.baseUrl}/products/${id}`;
        return this.http.get<Product>(url).pipe(
            finalize(() => this.loadingService.hide())
        );
    }

    getImageUrl(imageUrl: string): string {
        return `../../assets/images/${imageUrl}`;
    }

    getProductsByCategory(category: string): Observable<Product[]> {
        this.loadingService.show();
        const url = `${this.baseUrl}/products?category=${category}`;
        return this.http.get<Product[]>(url).pipe(
            finalize(() => this.loadingService.hide())
        );
    }

    getProductsByFilter(category?: string, brand?: string): Observable<Product[]> {
        this.loadingService.show();
        let url = `${this.baseUrl}/products?`;
        if (category) {
            url += `category=${category}&`;
        }
        if (brand) {
            url += `brand=${brand}`;
        }
        return this.http.get<Product[]>(url).pipe(
            finalize(() => this.loadingService.hide())
        );
    }

    getBrands(): Observable<string[]> {
        // this.loadingService.show();
        const url = `${this.baseUrl}/brands`;
        return this.http.get<string[]>(url);
    }
}
