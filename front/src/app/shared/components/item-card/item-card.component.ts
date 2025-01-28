import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from '../../models/post.model';
import { Topic } from '../../models/topic.model';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-item-card',
    templateUrl: './item-card.component.html',
    styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent {
    @Input() post: Post | undefined;
    @Input() topic: Topic | undefined;
    @Input() isSubscribed!: boolean;
    @Output() toggle = new EventEmitter<void>();

    onToggle(): void {
        this.toggle.emit();
    }
}
