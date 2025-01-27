import { Component, OnInit } from '@angular/core';
import { Observable, of, take } from 'rxjs';
import { Post } from 'src/app/shared/models/post.model';
import { PostService } from '../../services/post.service';
import { ActivatedRoute } from '@angular/router';
import { Comment } from 'src/app/shared/models/comment.model';
import { ProfileService } from 'src/app/profile/services/profile.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
    selector: 'app-post-details',
    templateUrl: './post-details.component.html',
    styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {
    post$!: Observable<Post>;
    user$!: Observable<User>;
    isLoading: boolean = true;
    commentContent: string = '';

    errorMessage: string | null = null;

    constructor(
        private postService: PostService,
        private profileService: ProfileService,
        private route: ActivatedRoute) {} 

    ngOnInit(): void {
        this.loadPost();
    }

    handleCreateComment() {
        if (this.commentContent.trim() === '') {
            console.log('Commentaire vide !');
            return;
        }

        const postId = Number(this.route.snapshot.paramMap.get('id'));

        this.postService.createComment({
            content: this.commentContent,
            post_id: postId
        }).subscribe({
            next: (response) => {
                this.loadPost();
                this.commentContent = '';
                this.errorMessage = null;
            },
            error: (error) => {
                this.errorMessage = 'Une erreur inattendue s’est produite. Veuillez réessayer.';
            }
        });
    }

    private loadPost(): void {
        const postId = Number(this.route.snapshot.paramMap.get('id'));
        this.post$ = this.postService.getPostById(postId);
        this.isLoading = false;
    }
}
