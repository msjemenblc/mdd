import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls:  ['./register.component.scss']
})
export class RegisterComponent {
    registerInputs = [
        { label: `Nom d'utilisateur`, type: 'text', name: 'username' },
        { label: 'Email', type: 'email', name: 'email'},
        { label: 'Mot de passe', type: 'password', name: 'password' }
    ];

    constructor(private authService: AuthService) {}

    handleRegister(data: { [key: string]: string }) {
        const registerData: { username: string, email: string, password: string } = {
            username: data['username'],
            email: data['email'],
            password: data['password']
        }

        this.authService.register(registerData).subscribe({
            next: (response) => {
                console.log('Register réussi', response);
            },
            error: (error) => {
                console.error("Erreur lors de l'inscription: ", error);
            }
        });
    }
}
