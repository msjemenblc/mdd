import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Topic } from 'src/app/shared/models/topic.model';
import { TopicService } from '../../services/topic.service';
import { ProfileService } from 'src/app/profile/services/profile.service';

@Component({
    selector: 'app-topic',
    templateUrl: './topic.component.html',
    styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit {
    @Input() includeAll: boolean = true;
    
    topics$!: Observable<Topic[]>;
    isLoading: boolean = true;
    subscribedTopicIds: number[] = [];

    constructor(
            private topicService: TopicService,
            private profileService: ProfileService) {}

    ngOnInit(): void {
        this.loadTopics();
        this.loadSubscribedTopics();
    }

    isSubscribed(topicId: number): boolean {
        return this.subscribedTopicIds.includes(topicId);
    }

    toggleSubscription(topicId: number): void {
        if (this.isSubscribed(topicId)) {
            // Si l'utilisateur est déjà abonné, on se désabonne
            this.profileService.unsubscribe(topicId).subscribe(() => {
                this.subscribedTopicIds = this.subscribedTopicIds.filter(id => id !== topicId);
            });
        } else {
            // Si l'utilisateur n'est pas abonné, on s'abonne
            this.profileService.subscribe(topicId).subscribe(() => {
                this.subscribedTopicIds.push(topicId);
            });
        }
    }

    private loadTopics(): void {
        this.topics$ = this.topicService.getAllTopics();
        this.isLoading = false;
    }

    private loadSubscribedTopics(): void {
        this.profileService.getSubscriptionsIds().subscribe(ids => {
            this.subscribedTopicIds = ids;
            if (!this.includeAll) {
                this.removeUnsubscribedTopics();
            }
        });
    }

    private removeUnsubscribedTopics(): void {
        this.topics$ = this.topics$.pipe(
            map(topics => {
                return topics.filter(topic => 
                    this.isSubscribed(topic.id)
                );
            })
        );
    }
}
