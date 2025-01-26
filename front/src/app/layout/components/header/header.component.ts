import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    isAuthenticated$!: Observable<boolean>;
    sidenavOpened: boolean = false;

    constructor(private authService: AuthService) { }

    ngOnInit(): void {
        this.isAuthenticated$ = this.authService.isAuthenticated();
    }

    toggleSidenav() {
        this.sidenavOpened = !this.sidenavOpened;
    }

    onTestClick(): void {
        console.log('bouton cliqué');
    }
}
