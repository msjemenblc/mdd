import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { TopicService } from 'src/app/topic/services/topic.service';
import { Observable } from 'rxjs';
import { Topic } from 'src/app/shared/models/topic.model';

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {
    postForm: FormGroup;
    topics$!: Observable<Topic[]>;

    errorMessage: string | null = null;

    constructor(
        private fb: FormBuilder,
        private postService: PostService,
        private topicService: TopicService
    ) {
        this.postForm = this.fb.group({
            topic_id: ['', [Validators.required]],
            title: ['', [Validators.required]],
            description: ['', [Validators.required]]
        });
    }

    ngOnInit(): void {
        this.loadTopics();
    }

    handleCreatePost() {
        if (this.postForm.invalid) {
            console.log('Formulaire invalide', this.postForm.errors);
            return;
        }

        this.postService.createPost(this.postForm.value).subscribe({
            next: (response) => {
                this.errorMessage = null;
            },
            error: (error) => {
                this.errorMessage = 'Une erreur inattendue s’est produite. Veuillez réessayer.';
            }
        });
    }

    private loadTopics(): void {
        this.topics$ = this.topicService.getAllTopics();
    }
}
