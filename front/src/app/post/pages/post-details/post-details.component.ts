import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/shared/models/post.model';
import { PostService } from '../../services/post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-post-details',
    templateUrl: './post-details.component.html',
    styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {
    post$!: Observable<Post>;
    isLoading: boolean = true;

    constructor(
        private postService: PostService,
        private route: ActivatedRoute) {} 

    ngOnInit(): void {
        this.loadPost();
    }

    private loadPost(): void {
        const postId = Number(this.route.snapshot.paramMap.get('id'));
        this.post$ = this.postService.getPostById(postId);
        this.isLoading = false;
    }
}
