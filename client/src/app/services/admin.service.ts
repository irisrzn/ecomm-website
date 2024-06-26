import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadingService } from './loading.service';
import { tap, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = 'http://localhost:3000/admin';

  constructor(private http: HttpClient, private loadingService: LoadingService) { }

  getStatistics(): Observable<any> {
    this.loadingService.show();
    return this.http.get(`${this.apiUrl}/statistics`).pipe(
      finalize(() => this.loadingService.hide())
    );
  }

  getAllUsers(): Observable<any> {
    this.loadingService.show();
    return this.http.get(`${this.apiUrl}/users`).pipe(
      finalize(() => this.loadingService.hide())
    );
  }

  getAllOrders(): Observable<any> {
    this.loadingService.show();
    return this.http.get(`${this.apiUrl}/orders`).pipe(
      finalize(() => this.loadingService.hide())
    );
  }
  getAllProducts(): Observable<any> {
    this.loadingService.show();
    return this.http.get(`${this.apiUrl}/products`).pipe(
      finalize(() => this.loadingService.hide())
    );
  }

  createProduct(product: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/product`, product);
  }

  updateProduct(id: string, product: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/product/${id}`, product);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/product/${id}`);
  }

  updateUserRole(id: string, role: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${id}/role`, { role });
  }
}
