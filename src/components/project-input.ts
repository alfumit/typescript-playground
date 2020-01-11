import { Component } from "./base-component.js";
import { Autobind } from "../decorators/autobind.js";
import { projectState } from "../state/project-state.js";
import { validate } from "../utils/valdation.js";

//ProjectInput Class
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{
    titleInput: HTMLInputElement;
    descInput: HTMLInputElement;
    peopleInput: HTMLInputElement;

    constructor() {
        super("project-input", "", "user-input");
        this.titleInput = this.element.querySelector("#title")! as HTMLInputElement;
        this.descInput = this.element.querySelector("#description")! as HTMLInputElement;
        this.peopleInput = this.element.querySelector("#people")! as HTMLInputElement;

        this.configure();
    }

    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }

    renderContent(): void {}

    @Autobind
    private submitHandler(event: Event) {
        event.preventDefault();
        const userInput = this.getUserInput();
        if(Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            projectState.addProject(title, desc, people);
            this.clearInputs();
        } else if (!userInput) {
            alert('Not a valid project');
        }
    }

    private getUserInput(): [string, string, number] | boolean {
        const isValid = !(!validate({value: this.titleInput.value, required: true, minLength: 5})
            || !validate({value: this.descInput.value, required: true, minLength: 5})
            || !validate({value: +this.peopleInput.value, required: true, min: 1, max: 5}));

        if(isValid) {
            return [this.titleInput.value, this.descInput.value, +this.peopleInput.value ];
        }  else {
            return false;
        }

    }

    private clearInputs(): void {
        this.titleInput.value = '';
        this.descInput.value = '';
        this.peopleInput.value = '';
    }
}
