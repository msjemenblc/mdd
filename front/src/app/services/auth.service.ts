import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface AuthResponse {
    token: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl: string = environment.apiUrl + '/auth';
    private tokenKey: string = 'auth_token';
    private authStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(!!this.getToken());

    constructor(
        private http: HttpClient,
        private router: Router) {}

    login(credentials: { identifier: string; password: string }): Observable<any> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
            tap(response => {
                const token = response.token;
                if (token) {
                    this.setToken(token);
                    this.authStatus.next(true);
                    this.router.navigate(['/post']);
                }
            })
        )
    }

    register(userData: { name: string; email: string; password: string }): Observable<any> {
        return this.http.post(`${this.apiUrl}/register`, userData);
    }

    logout(): void {
        this.removeToken();
        this.authStatus.next(false);
        this.router.navigate(['/']);
    }

    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    setToken(token: string): void {
        localStorage.setItem(this.tokenKey, token);
    }

    removeToken(): void {
        localStorage.removeItem(this.tokenKey);
    }

    isAuthenticated(): Observable<boolean> {
        return this.authStatus.asObservable();
    }
}
