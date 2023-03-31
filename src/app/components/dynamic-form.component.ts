import { Component } from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {InputConfig} from "../interfaces/input-config.interface";
import {DynamicFormService} from "../services/dynamic-form.service";


@Component({
    selector: 'app-dynamic-form',
    template: `
        <form [formGroup]="form">
            <div *ngFor="let input of inputs">
                <label>{{ input.label }}</label>
                <input
                        [type]="input.type"
                        [formControlName]="input.name"
                        [placeholder]="input.placeholder"
                        (blur)="error = !form.valid"
                />
                <div *ngIf="error">
                    <span *ngIf="form.get(input.name)?.hasError('required')">
                    {{
                        'This field is required'
                    }}
                    </span>
                </div>
            </div>
            <button type="submit">Submit</button>
        </form>
    `
})
export class DynamicFormComponent {
    error: boolean = false
    errorLists: any = {};

    form: FormGroup;
    inputs: InputConfig[] = [
        {
            type: 'text',
            label: 'First Name',
            name: 'firstName',
            placeholder: 'Enter your first name',
            validations: [
                {
                    name: 'required',
                    validator: Validators.required,
                    message: 'This field is required'
                },
                {
                    name: 'pattern',
                    validator: Validators.pattern('^[a-zA-Z]+$')
                }
            ]
        },
        {
            type: 'email',
            label: 'Email Address',
            name: 'email',
            placeholder: 'Enter your email address',
            validations: [
                {
                    name: 'required',
                    validator: Validators.required
                },
                {
                    name: 'email',
                    validator: Validators.email
                }
            ]
        }
    ];

    constructor(private formService: DynamicFormService) {
        this.form = this.formService.toFormGroup(this.inputs);
    }

    protected readonly Object = {
        keys: Object.keys
    }
}
