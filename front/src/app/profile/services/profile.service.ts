import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { map, Observable, tap } from "rxjs";
import { AuthService } from "src/app/core/services/auth.service";
import { User } from "src/app/shared/models/user.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    private apiUrl: string = `${environment.apiUrl}/user`;

    constructor(
        private http: HttpClient,
        private router: Router,
        private authService: AuthService) {}

    /**
     * Récupère l'utilisateur actuel.
     * @returns Observable<User>
     */
    getProfile(): Observable<User> {
        return this.http.get<User>(`${this.apiUrl}/me`).pipe(
            map((user: any) => {
                return {
                    ...user,
                    createdAt: new Date(user['created_at']),
                    updatedAt: user['updated_at'] ? new Date(user['updated_at']) : null,
                }
            })
        )
    }

    /**
     * Met à jour les informations de l'utilisateur actuel.
     * @param data { username: string; email: string }
     * @returns Observable<string>
     */
    updateProfile(data: { username: string; email: string }): Observable<string> {
        return this.http.put<{ token: string }>(`${this.apiUrl}/me`, data).pipe(
            tap((response) => {
                this.authService.setToken(response.token);
                this.router.navigate(['/post']);
            }),
            map((response) => response.token)
        );
    }

    /**
     * Récupère les IDs des topics auxquels l'utilisateur est abonné.
     * @returns Observable<number[]>
     */
    getSubscriptionsIds(): Observable<number[]> {
        return this.http.get<User>(`${this.apiUrl}/me`).pipe(
            map((user) => user.subscriptions.map(subscription => subscription.id))
        );
    }


    /**
     * Abonne l'utilisateur à un topic.
     * @param topicId L'identifiant du topic à auquel s'abonner.
     * @returns Observable<string>
     */
    subscribe(topicId: number): Observable<string> {
        return this.http.post<{ message: string }>(`${this.apiUrl}/subscribe/${topicId}`, {}).pipe(
            map(response => {
                return response.message;
            })
        );
    }

    /**
     * Se désabonne d'un topic.
     * @param topicId L'identifiant du topic à auquel se désabonner.
     * @returns Observable<string>
     */
    unsubscribe(topicId: number): Observable<string> {
        return this.http.delete<{ message: string }>(`${this.apiUrl}/subscribe/${topicId}`).pipe(
            map(response => {
                return response.message;
            })
        );
    }
}