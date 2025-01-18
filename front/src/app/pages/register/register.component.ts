import { Component } from '@angular/core';

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

    handleRegister(data: any) {
        console.log('Register data:', data);
    }
}
