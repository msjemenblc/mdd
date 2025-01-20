import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent {
    @Input() title: string = '';
    @Input() inputs: { label: string; type: string; name: string }[] = [];
    @Input() buttonText: string = 'Valider';
    @Input() errorMessage: string | null = null;
    @Output() submitForm = new EventEmitter<{ [key: string]: string }>();

    formData: { [key: string]: string } = {};

    onSubmit() {
        this.submitForm.emit(this.formData);
    }
}
