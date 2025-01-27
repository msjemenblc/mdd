import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { map, Observable } from "rxjs";
import { Topic } from "src/app/shared/models/topic.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class TopicService {
    private apiUrl: string = `${environment.apiUrl}/topic`;


    constructor(
        private http: HttpClient,
        private router: Router) {}

    /**
     * Récupère tous les topics.
     * @returns Observable<Topic[]>
     */
    getAllTopics(): Observable<Topic[]> {
        return this.http.get<{ topics: any[] }>(this.apiUrl).pipe(
            map((response) => {
                return response.topics.map((topic) => {
                    return {
                        ...topic,
                        createdAt: new Date(topic['created_at']),
                        updatedAt: topic['updated_at'] ? new Date(topic['updated_at']) : null,
                    };
                });
            })
        );
    }
}