import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../product.model';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private baseUrl = 'http://localhost:3000/api';

    constructor(private http: HttpClient) { }

    addProduct(product: Product): Observable<Product> {
        const url = `${this.baseUrl}/products`;
        return this.http.post<Product>(url, product);
    }

    getProducts(): Observable<Product[]> {
        const url = `${this.baseUrl}/products`;
        return this.http.get<Product[]>(url);
    }

    getProductById(id: string): Observable<Product> {
        const url = `${this.baseUrl}/products/${id}`;
        return this.http.get<Product>(url);
    }

    updateProduct(id: string, product: Product): Observable<Product> {
        const url = `${this.baseUrl}/products/${id}`;
        return this.http.put<Product>(url, product);
    }

    deleteProduct(id: string): Observable<void> {
        const url = `${this.baseUrl}/products/${id}`;
        return this.http.delete<void>(url);
    }

    searchProducts(searchQuery: string): Observable<Product[]> {
        const url = `${this.baseUrl}/products?search=${searchQuery}`;
        return this.http.get<Product[]>(url);
    }

    getImageUrl(imageUrl: string): string {
        return `../../assets/images/${imageUrl}`;
    }

    getProductsByCategory(category: string): Observable<Product[]> {
        const url = `${this.baseUrl}/products?category=${category}`;
        return this.http.get<Product[]>(url);
    }

    getProductsByFilter(category?: string, brand?: string): Observable<Product[]> {
        let url = `${this.baseUrl}/products?`;
        if (category) {
            url += `category=${category}&`;
        }
        if (brand) {
            url += `brand=${brand}`;
        }
        return this.http.get<Product[]>(url);
    }

    getBrands(): Observable<string[]> {
        const url = `${this.baseUrl}/brands`;
        return this.http.get<string[]>(url);
    }
}
