export interface InputConfig {
    type: string;
    label?: string;
    name: string;
    placeholder?: string;
    options?: {key: string, value: string}[];
    validations?: {name: string, validator: any}[];
}
