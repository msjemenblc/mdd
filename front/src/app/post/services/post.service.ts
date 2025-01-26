import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Post } from "src/app/shared/models/post.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class PostService {
    private apiUrl: string = `${environment.apiUrl}/post`;
    
    constructor(private http: HttpClient) {}

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
     * Récupère tous les posts.
     * @returns Observable<Post[]>
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
}