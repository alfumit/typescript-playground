var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from "./base-component.js";
import { Autobind } from "../decorators/autobind.js";
import { projectState } from "../state/project-state.js";
//ProjectInput Class
export class ProjectInput extends Component {
    constructor() {
        super("project-input", "", "user-input");
        this.titleInput = this.element.querySelector("#title");
        this.descInput = this.element.querySelector("#description");
        this.peopleInput = this.element.querySelector("#people");
        this.configure();
    }
    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }
    renderContent() { }
    submitHandler(event) {
        event.preventDefault();
        const userInput = this.getUserInput();
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            projectState.addProject(title, desc, people);
            this.clearInputs();
        }
        else if (!userInput) {
            alert('Not a valid project');
        }
    }
    getUserInput() {
        const isValid = !(!this.validate({ value: this.titleInput.value, required: true, minLength: 5 })
            || !this.validate({ value: this.descInput.value, required: true, minLength: 5 })
            || !this.validate({ value: +this.peopleInput.value, required: true, min: 1, max: 5 }));
        if (isValid) {
            return [this.titleInput.value, this.descInput.value, +this.peopleInput.value];
        }
        else {
            return false;
        }
    }
    clearInputs() {
        this.titleInput.value = '';
        this.descInput.value = '';
        this.peopleInput.value = '';
    }
    validate(validationInput) {
        let isValid = true;
        const val = validationInput.value;
        if (validationInput.required)
            isValid = isValid && !!val;
        if (validationInput.maxLength && typeof val === "string")
            isValid = isValid && (val.length <= validationInput.maxLength);
        if (validationInput.minLength && typeof val === "string")
            isValid = isValid && (val.length >= validationInput.minLength);
        if (validationInput.max && typeof val === "number")
            isValid = isValid && (val <= validationInput.max);
        if (validationInput.min && typeof val === "number")
            isValid = isValid && (val >= validationInput.min);
        return isValid;
    }
}
__decorate([
    Autobind
], ProjectInput.prototype, "submitHandler", null);
//# sourceMappingURL=project-input.js.map