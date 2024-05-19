import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInSubject: BehaviorSubject<boolean>;

  constructor(private http: HttpClient) {
    this.loggedInSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  }

  login(username: string, password: string): Observable<any> {
    // Replace the API_URL with your actual backend API URL
    const API_URL = 'http://localhost:3000/auth/login';
    return this.http.post<any>(API_URL, { username, password }).pipe(
      // Assuming your backend returns a token upon successful login
      map(response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          this.loggedInSubject.next(true);
        }
        return response;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedInSubject.next(false);
  }

  register(username: string, email: string, password: string): Observable<any> {
    // Replace the API_URL with your actual backend API URL
    const API_URL = 'http://localhost:3000/auth/register  ';
    return this.http.post<any>(API_URL, { username, email, password });
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getLoggedIn(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }
}
