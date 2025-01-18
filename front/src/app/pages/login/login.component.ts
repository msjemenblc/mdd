import { Component } from '@angular/core';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    loginInputs = [
        { label: `Email ou nom d'utilisateur`, type: 'text', name: 'identifier' },
        { label: 'Mot de passe', type: 'password', name: 'password' }
    ];

    handleLogin(data: any) {
        console.log('Login data:', data);
    }
}
