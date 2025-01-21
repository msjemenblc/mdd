import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

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
    @Input() formGroup!: FormGroup;
    @Output() submitForm = new EventEmitter<void>();

    formData: { [key: string]: string } = {};

    onSubmit() {
        if (this.formGroup.valid) {
            this.submitForm.emit();
        }
    }
}
