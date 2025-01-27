import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { ProfileService } from '../../services/profile.service';
import { Observable, tap } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    user$!: Observable<User>;
    profileForm: FormGroup;

    profileInputs = [
        { label: '', type: 'text', name: 'username' },
        { label: '', type: 'email', name: 'email' }
    ];

    errorMessage: string | null = null;

    constructor(
            private fb: FormBuilder,
            private profileService: ProfileService,
            private authService: AuthService) {
        this.profileForm = this.fb.group({
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
            ]
        })
    }

    ngOnInit(): void {
        this.user$ = this.profileService.getProfile();

        this.user$.subscribe({
            next: (user) => {
                this.profileForm.patchValue({
                    username: user.username,
                    email: user.email
                });
            },
            error: (err) => {
                console.error('Erreur lors de la récupération du profil :', err);
                this.errorMessage = "Impossible de charger le profil.";
            }
        });
    }

    handleEditProfile() {
        if (this.profileForm.invalid) {
            console.log('Formulaire invalide', this.profileForm.errors);
            return;
        }

        this.profileService.updateProfile(this.profileForm.value).subscribe({
            next: (response) => {
                this.errorMessage = null;
            },
            error: (error) => {
                this.errorMessage = 'Une erreur inattendue s’est produite. Veuillez réessayer.';
            }
        })
    }

    onLogoutClick() {
        this.authService.logout();
    }
}
