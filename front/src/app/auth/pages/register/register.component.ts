import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls:  ['./register.component.scss']
})
export class RegisterComponent {
    registerForm: FormGroup;

    registerInputs = [
        { label: `Nom d'utilisateur`, type: 'text', name: 'username' },
        { label: 'Email', type: 'email', name: 'email'},
        { label: 'Mot de passe', type: 'password', name: 'password' }
    ];

    errorMessage: string | null = null;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService
    ) {
        this.registerForm = this.fb.group({
            username: [
                '', 
                [
                    Validators.required, 
                    Validators.minLength(5), 
                    Validators.maxLength(40)
                ]
            ],
            email: [
                '', 
                [
                    Validators.required, 
                    Validators.email, 
                    Validators.minLength(5), 
                    Validators.maxLength(50)
                ]
            ],
            password: [
                '',
                [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(50),
                    Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,50}$/)
                ]
            ]
        });
    }

    handleRegister() {
        if (this.registerForm.invalid) {
            console.log('Formulaire invalide', this.registerForm.errors);
            return;
        }

        this.authService.register(this.registerForm.value).subscribe({
            next: (response) => {
                this.errorMessage = null;
            },
            error: (error) => {
                console.log(error);
                if (error.status === 401) {
                    this.errorMessage = "Utilisez un nom d'utilisateur ou un email différent !";
                } else {
                    this.errorMessage = 'Une erreur inattendue s’est produite. Veuillez réessayer.';
                }
            }
        });
    }
}
