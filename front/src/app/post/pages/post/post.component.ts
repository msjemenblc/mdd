import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
    constructor(private authService: AuthService) { }

    ngOnInit(): void {
        setTimeout(() => {
            this.authService.logout();
        }, 5000);
    }
}
