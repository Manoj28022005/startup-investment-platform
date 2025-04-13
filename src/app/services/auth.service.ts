import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface User {
  id: string;
  email: string;
  role: 'investor' | 'founder';
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';
  private currentUserSubject = new BehaviorSubject<User | null>({
    id: '1',
    email: 'test@example.com',
    role: 'founder',
    name: 'Test User'
  });
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    // Always set a mock user for development
    localStorage.setItem('currentUser', JSON.stringify(this.currentUserSubject.value));
  }

  login(email: string, password: string): Observable<any> {
    // Mock successful login
    return of({ token: 'mock-token', user: this.currentUserSubject.value }).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('currentUser', JSON.stringify(response.user));
        this.currentUserSubject.next(response.user);
      })
    );
  }

  register(user: { email: string; password: string; role: string; name: string }): Observable<any> {
    // Mock successful registration
    return of({ token: 'mock-token', user: this.currentUserSubject.value }).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('currentUser', JSON.stringify(response.user));
        this.currentUserSubject.next(response.user);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return true; // Always return true for development
  }

  getToken(): string | null {
    return 'mock-token'; // Always return a mock token for development
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}
