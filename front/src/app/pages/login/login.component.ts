import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

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

    errorMessage: string | null = null;

    constructor(private authService: AuthService) {}

    handleLogin(data: { [key: string]: string }) {
        const loginData: { identifier: string, password: string } = {
            identifier: data['identifier'],
            password: data['password']
        }

        this.authService.login(loginData).subscribe({
            next: (response) => {
                this.errorMessage = null;
            },
            error: (error) => {
                if (error.status === 401) {
                    this.errorMessage = "Identifiant ou mot de passe incorrect !";
                } else {
                    this.errorMessage = 'Une erreur inattendue s’est produite. Veuillez réessayer.';
                }
            }
        });
    }
}
