import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, switchMap, filter, take } from 'rxjs/operators';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInSubject: BehaviorSubject<boolean>;
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private alertService: AlertService) {
    this.loggedInSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  }

  register(username: string, email: string, password: string, fname: string, lname: string): Observable<any> {
    const API_URL = 'http://localhost:3000/auth/register  ';
    return this.http.post<any>(API_URL, { username, email, password, fname, lname }).pipe(
      map(response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('username', username);
        }
        return response;
      }),
      catchError(error => {
        let errorMessage = 'Registration failed';
        if (error.status === 400 && error.error.message === 'Username or email already exists') {
          errorMessage = 'Username or email already exists';
        }
        this.alertService.showAlert(errorMessage);
        return throwError(error);
      })
    );
  }

  login(username: string, password: string): Observable<any> {
    const API_URL = 'http://localhost:3000/auth/login';
    return this.http.post<any>(API_URL, { username, password }).pipe(
      map(response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);          
          if (response.role === 'admin') {
            localStorage.setItem('isAdmin', 'true');
          } else {
            localStorage.setItem('isAdmin', 'false');
          }
          console.log(localStorage.getItem('isAdmin'));
          localStorage.setItem('username', username);
          this.loggedInSubject.next(true);
        }
        return response;
      }),
      catchError(error => {
        let errorMessage = 'Login failed';
        if (error.status === 404) {
          errorMessage = 'User not found. Please try again or register if you don\'t have an account.';
        }
        if (error.status === 401) {
          errorMessage = 'Wrong password. Please try again or register if you don\'t have an account.';
        }
        this.alertService.showAlert(errorMessage);
        return throwError(error);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('username');
    this.loggedInSubject.next(false);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  isAdmin(): boolean {
    console.log(localStorage.getItem('isAdmin'));
    
    return localStorage.getItem('isAdmin') === 'true';
  }

  getLoggedIn(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }

  refreshToken(): Observable<any> {
    const API_URL = 'http://localhost:3000/auth/refresh-token';
    const refreshToken = localStorage.getItem('refreshToken');

    return this.http.post<any>(API_URL, { refreshToken }).pipe(
      map(response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
        }
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        this.logout();
        return throwError(error);
      })
    );
  }

  getAccessToken(): string | null {
    return localStorage.getItem('token');
  }

  handle401Error(requestFn: () => Observable<any>): Observable<any> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.refreshToken().pipe(
        switchMap((token: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token.accessToken);
          return requestFn();
        }),
        catchError(err => {
          this.isRefreshing = false;
          this.logout();
          return throwError(err);
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(() => requestFn())
      );
    }
  }
}