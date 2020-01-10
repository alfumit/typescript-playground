//State management
class ProjectState {
    private static _id: number = 0;
    private static assignId() {
        this._id++;
        return this._id;
    }

    private static instance: ProjectState;
    static getInstance() {
        if(this.instance)  return this.instance;
        this.instance = new ProjectState();
        return this.instance
    }

    private constructor() {}
    private projects: any[] = [];
    private listeners: Function[] = [];


    addProject(title: string, description: string, numOfPeople: number) {
        const newProject = {
            id: ProjectState.assignId(),
            title,
            description,
            people: numOfPeople
        };

        this.projects.push(newProject);
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }

    addListener(listenerFn: Function) {
        this.listeners.push(listenerFn);
    }

}
const projectState = ProjectState.getInstance();


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

//Decorators
function Autobind(_: any, _2: any, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originalMethod: Function = descriptor.value;
    const boundMethod: PropertyDescriptor = {
        enumerable: false,
        configurable: true,
        get(): any {
            return originalMethod.bind(this);
        }
    };
    return boundMethod;
}

//ProjectList Class
class ProjectList {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLElement;
    assignedProjects: any[] = [];

    constructor(public type: 'active' | 'finished') {
        this.templateElement = document.getElementById("project-list")! as HTMLTemplateElement;
        this.hostElement = document.getElementById("app")! as HTMLDivElement;
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as HTMLElement;
        this.element.id = `${this.type}-projects`;

        projectState.addListener((projects: any) => {
            this.assignedProjects = projects;
            this.renderProjects();
        });

        this.renderContent();
    }

    private renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = `List of ${this.type} projects`;
    }

    private renderProjects() {
        const listEl =  document.querySelector(`#${this.type}-projects`)! as HTMLUListElement;
        for (const item of this.assignedProjects) {
            const listItem = document.createElement('li')! as HTMLLIElement;
            listItem.textContent = `${item.title} ${item.description} ${item.people}`;
            listEl.appendChild(listItem);
        }
    }
}

//ProjectInput Class
class ProjectInput {
    template: HTMLTemplateElement;
    element: HTMLDivElement;
    form: HTMLFormElement;
    titleInput: HTMLInputElement;
    descInput: HTMLInputElement;
    peopleInput: HTMLInputElement;


    constructor() {
        this.element = document.createElement('div')! as HTMLDivElement;
        this.template = document.getElementById("project-input")! as HTMLTemplateElement;
        this.form = document.importNode(this.template.content, true).firstElementChild! as HTMLFormElement;
        this.element.appendChild(this.form);
        this.element.id = "user-input";

        this.titleInput = this.form.querySelector("#title")! as HTMLInputElement;
        this.descInput = this.form.querySelector("#description")! as HTMLInputElement;
        this.peopleInput = this.form.querySelector("#people")! as HTMLInputElement;

        this.configure();
    }

    private configure() {
        this.form.addEventListener('submit', this.submitHandler);
    }

    @Autobind
    private submitHandler(event: Event) {
        event.preventDefault();
        const userInput = this.getUserInput();
        const [title, desc, people] = userInput;
        console.log(userInput);
        projectState.addProject(title, desc, people);
        this.clearInputs();
    }

    private getUserInput(): [string, string, number] {
        const isValid = !this.validate({value: this.titleInput.value, required: true, minLength: 5})
            || !this.validate({value: this.descInput.value, required: true, minLength: 5})
            || !this.validate({value: +this.peopleInput.value, required: true, min: 1, max: 5});

        if(isValid) {
            alert("Not valid");
            return [this.titleInput.value, this.descInput.value, +this.peopleInput.value ];
        }  else {
            return [this.titleInput.value, this.descInput.value, +this.peopleInput.value ];
        }

    }

    private clearInputs(): void {
        this.titleInput.value = '';
        this.descInput.value = '';
        this.peopleInput.value = '';
    }

    private validate(validationInput: Validatable) {
        let isValid: boolean = true;
        const val = validationInput.value;
        if (validationInput.required)  isValid = isValid && !!val;
        if (validationInput.maxLength && typeof val === "string") isValid = isValid && (val.length <= validationInput.maxLength);
        if (validationInput.minLength && typeof val === "string") isValid = isValid && (val.length >= validationInput.minLength);
        if (validationInput.max && typeof val === "number") isValid = isValid && (val <= validationInput.max);
        if (validationInput.min && typeof val === "number") isValid = isValid && (val >= validationInput.min);

        return isValid;
    }

}

//App Class
class  App {
    appEl: HTMLElement;

    constructor() {
        this.appEl = document.getElementById("app")! as HTMLDivElement;
    }

    render(el: ProjectInput | ProjectList) {
        this.appEl.appendChild(el.element);
    }
}

//Instantiation
const app = new App();
const projectInput = new ProjectInput();
const activeProjects = new ProjectList('active');
const FinishedProjects = new ProjectList('finished');

app.render(projectInput);
app.render(activeProjects);
app.render(FinishedProjects);

