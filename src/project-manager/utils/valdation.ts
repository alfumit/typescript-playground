//Interfaces
interface Validatable {
    name?: string;
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number
}

export function validate(validationInput: Validatable) {
    let isValid: boolean = true;
    const val = validationInput.value;
    if (validationInput.required)  isValid = isValid && !!val;
    if (validationInput.maxLength && typeof val === "string") isValid = isValid && (val.length <= validationInput.maxLength);
    if (validationInput.minLength && typeof val === "string") isValid = isValid && (val.length >= validationInput.minLength);
    if (validationInput.max && typeof val === "number") isValid = isValid && (val <= validationInput.max);
    if (validationInput.min && typeof val === "number") isValid = isValid && (val >= validationInput.min);

    return isValid;
}
