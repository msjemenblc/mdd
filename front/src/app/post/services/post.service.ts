import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { map, Observable } from "rxjs";
import { Post } from "src/app/shared/models/post.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class PostService {
    private apiUrl: string = `${environment.apiUrl}/post`;
    
    constructor(
        private http: HttpClient,
        private router: Router) {}

    /**
     * Récupère tous les posts.
     * @returns Observable<Post[]>
     */
    getAllPosts(): Observable<Post[]> {
        return this.http.get<{ posts: any[] }>(this.apiUrl).pipe(
            map((response) => {
                return response.posts.map((post) => {
                    return {
                        ...post,
                        createdAt: new Date(post['created_at']),
                        updatedAt: post['updated_at'] ? new Date(post['updated_at']) : null,
                    };
                });
            })
        );
    }

    /**
     * Récupère un post à l'id demandé.
     * @returns Observable<Post>
     */
    getPostById(id: number): Observable<Post> {
        return this.http.get<Post>(`${this.apiUrl}/${id}`).pipe(
            map((post: any) => {
                return {
                    ...post,
                    createdAt: new Date(post['created_at']),
                    updatedAt: post['updated_at'] ? new Date(post['updated_at']) : null,
                };
            })
        ) 
    }

    /**
     * Crée un nouvel article.
     * @param postData Les données de l'article à créer.
     * @returns Observable<string> Message de succès
     */
    createPost(postData: { title: string; description: string; topic_id: number }): Observable<string> {
        return this.http.post<{ message: string }>(this.apiUrl, postData).pipe(
            map((response) => {
                this.router.navigate(['/post']);
                return response.message;
            })
        );
    }

    /**
     * Crée un nouveau commentaire.
     * @param commentData Les données de du commentaire à créer.
     * @returns Observable<string> Message de succès
     */
    createComment(commentData: { content: string; post_id: number }): Observable<string> {
        return this.http.post<{ message: string }>(`${environment.apiUrl}/comment`, commentData).pipe(
            map((response) => {
                return response.message;
            })
        )
    }
}