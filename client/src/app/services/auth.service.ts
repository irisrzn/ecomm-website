import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, switchMap, filter, take } from 'rxjs/operators';
import { Observable, BehaviorSubject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInSubject: BehaviorSubject<boolean>;
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {
    this.loggedInSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  }

  register(username: string, email: string, password: string, fname: string, lname: string): Observable<any> {
    const API_URL = 'http://localhost:3000/auth/register  ';
    return this.http.post<any>(API_URL, { username, email, password, fname, lname }).pipe(
      map(response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          this.loggedInSubject.next(true);
        }
        return response;
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
          this.loggedInSubject.next(true);
        }
        return response;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    this.loggedInSubject.next(false);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  isAdmin(): boolean {
    console.log(localStorage.getItem('isAdmin'));
    
    return localStorage.getItem('isAdmin') === 'true';
  }

  // isAdmin(): boolean {
  //   const token = localStorage.getItem('token');
  //   if (!token) {
  //     return false;
  //   }
  //   const payload = JSON.parse(atob(token.split('.')[1]));

  //   console.log("role: " + payload.role);
    
  //   return payload.role === 'admin';
  // }

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
