import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    loginForm: FormGroup;

    loginInputs = [
        { label: `Email ou nom d'utilisateur`, type: 'text', name: 'identifier' },
        { label: 'Mot de passe', type: 'password', name: 'password' }
    ];

    errorMessage: string | null = null;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService
    ) {
        this.loginForm = this.fb.group({
            identifier: [
                '',
                [
                    Validators.required,
                    Validators.minLength(5),
                    Validators.maxLength(50)
                ]
            ],
            password: [
                '',
                [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(50)
                ]
            ]
        });
    }

    handleLogin() {
        if (this.loginForm.invalid) {
            console.log('Fomulaire invalide', this.loginForm.errors);
            return;
        }

        this.authService.login(this.loginForm.value).subscribe({
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
