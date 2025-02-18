import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NonAuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(): Observable<boolean> {
        return this.authService.isAuthenticated().pipe(
            map(isAuthenticated => {
                if (!isAuthenticated) {
                    return true;
                } else {
                    this.router.navigate(['/post']);
                    return false;
                }
            })
        );
    }
}
