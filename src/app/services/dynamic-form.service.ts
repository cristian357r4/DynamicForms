import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {InputConfig} from "../interfaces/input-config.interface";

@Injectable({
    providedIn: 'root'
})
export class DynamicFormService {

    constructor() { }

    toFormGroup(inputs: InputConfig[]) {
        let group: any = {};

        inputs.forEach(input => {
            const validations: any[] = [];
            input.validations?.forEach(validation => {
                validations.push(validation.validator);
            });
            group[input.name] = new FormControl('', validations);
        });

        return new FormGroup(group);
    }
}

