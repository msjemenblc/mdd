import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from 'src/app/shared/models/post.model';
import { map, Observable } from 'rxjs';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
    posts$!: Observable<Post[]>;
    isLoading: boolean = true;
    sortBy: string = 'recent';

    constructor(private postService: PostService) {}

    ngOnInit(): void {
        this.loadPosts();
    }

    private loadPosts(): void {
        this.posts$ = this.postService.getAllPosts();
        this.sortPosts();
        this.isLoading = false;
    }

    sortPosts(): void {
        this.posts$ = this.posts$.pipe(
            map((posts) => {
                return [...posts].sort((a, b) => {
                    switch (this.sortBy) {
                        case 'a-z':
                            return a.title.localeCompare(b.title);
                        case 'z-a':
                            return b.title.localeCompare(a.title);
                        case 'recent':
                            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                        case 'oldest':
                            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                        case 'author':
                            return a.author.username.localeCompare(b.author.username);
                        default:
                            return 0;
                    }
                });
            })
        );
    }

    setSortBy(criteria: string): void {
        this.sortBy = criteria;
        this.sortPosts();
    }
}
