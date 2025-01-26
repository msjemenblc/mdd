import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { Topic } from '../../models/topic.model';

@Component({
    selector: 'app-item-card',
    templateUrl: './item-card.component.html',
    styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent {
    @Input() post: Post | undefined;
    @Input() topic: Topic | undefined;
}
