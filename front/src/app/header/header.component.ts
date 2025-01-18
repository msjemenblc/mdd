import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    isAuthenticated: boolean = true;
    sidenavOpened: boolean = false;

    constructor() { }

    ngOnInit(): void {
    }

    toggleSidenav() {
        this.sidenavOpened = !this.sidenavOpened;
    }
}
