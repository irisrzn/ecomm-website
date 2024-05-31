import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../product.model';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private baseUrl = 'http://localhost:3000/api/products'; // API endpoint to fetch products

    constructor(private http: HttpClient) { }

    // CREATE (POST)
    addProduct(product: Product): Observable<Product> {
        return this.http.post<Product>(this.baseUrl, product);
    }

    // READ (GET) all products
    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.baseUrl);
    }

    // READ (GET) a product by ID
    getProductById(id: string): Observable<Product> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.get<Product>(url);
    }

    // UPDATE (PUT)
    updateProduct(id: string, product: Product): Observable<Product> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.put<Product>(url, product);
    }

    // DELETE (DELETE)
    deleteProduct(id: string): Observable<void> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.delete<void>(url);
    }

    // Search for products
    searchProducts(searchQuery: string): Observable<Product[]> {
        const url = `${this.baseUrl}?search=${searchQuery}`;
        return this.http.get<Product[]>(url);
    }
}