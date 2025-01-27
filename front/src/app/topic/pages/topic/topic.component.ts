import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Topic } from 'src/app/shared/models/topic.model';
import { TopicService } from '../../services/topic.service';

@Component({
    selector: 'app-topic',
    templateUrl: './topic.component.html',
    styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit {
    topics$!: Observable<Topic[]>;
    isLoading: boolean = true;

    constructor(private topicService: TopicService) { }

    ngOnInit(): void {
        this.loadTopics();
    }

    private loadTopics(): void {
        this.topics$ = this.topicService.getAllTopics();
        this.isLoading = false;
    }

}
