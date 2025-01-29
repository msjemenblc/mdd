import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    private excludedRoutes = [
        '/api/auth/login',
        '/api/auth/register'
    ];

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        const isExcluded = this.excludedRoutes.some(route => req.url.includes(route));

        if (isExcluded || req.method === "OPTIONS") {
            console.log('Excluded:' + req);
            return next.handle(req);
        }

        const token = localStorage.getItem('auth_token');
        if (token) {
            console.log('Token ajouté');

            const clonedRequest = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log('Requête clonée:' + clonedRequest);
            return next.handle(clonedRequest);
        }

        return next.handle(req);
    }
}
