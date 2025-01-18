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
    @Output() submitForm = new EventEmitter<any>();

    formData: { [key: string]: string } = {};

    onSubmit() {
        this.submitForm.emit(this.formData);
    }
}
