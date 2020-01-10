enum ProjectStatus {Active, Finished}

//Project Type
class Project {
    constructor(public id: string,
                public title: string,
                public description: string,
                public people: number,
                public status: ProjectStatus) {

    }
}

//State management
type Listener<T> = (items: T[]) => void;
class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listenerFn: Listener<T>) {
        this.listeners.push(listenerFn);
    }
}
class ProjectState extends State<Project>{
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

    private constructor() {
        super();
    }

    private projects: Project[] = [];

    addProject(title: string, description: string, numOfPeople: number) {
        const newProject = new Project(ProjectState.assignId().toString(), title, description, numOfPeople, ProjectStatus.Active);

        this.projects.push(newProject);
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
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

// Component Base Class
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    hostElement?: T;
    element: U;

    protected constructor(templateId: string, hostElementId?: string, newElementId?: string) {
        this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as U;
        if(newElementId) {
            this.element.id = newElementId;
        }

        if(hostElementId) {
            document.getElementById(hostElementId)!.appendChild(this.element);
        }
    }

    abstract configure(): void;
    abstract renderContent(): void;
}

//ProjectItem Class
class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> {

    constructor(public hostElementId: string, public prj: Project) {
        super("single-project", hostElementId, prj.id);
        this.renderContent();
        this.configure();
    }

    renderContent(): void {
        // this.element.innerHTML = `${this.prj.title} | ${this.prj.description} |  ${this.prj.people}`
        this.element.querySelector("h2")!.innerText =  this.prj.title;
        this.element.querySelector("h3")!.innerText =  `Number of people involved: ${this.prj.people.toString()}`;
        this.element.querySelector("p")!.innerText =  this.prj.description;
    }

    configure(): void {}
}

//ProjectList Class
class ProjectList extends Component<HTMLDivElement, HTMLElement> {
    assignedProjects: Project[] = [];

    constructor(public type: 'active' | 'finished') {
        super("project-list", "", `${type}-projects`);
        this.configure();
        this.renderContent();
    }

    renderContent() {
        this.element!.querySelector('ul')!.id = `${this.type}-projects-list`;
        this.element!.querySelector('h2')!.textContent = `List of ${this.type} projects`;
    }

    configure(): void {
        projectState.addListener((projects: Project[]) => {
            this.assignedProjects  = projects.filter((prj) => {
                if(this.type === 'active') {
                    return prj.status === ProjectStatus.Active;
                } else {
                    return prj.status === ProjectStatus.Finished;
                }
            });
            this.renderProjects();
        });
    }

    private renderProjects() {
        const listEl =  document.querySelector(`#${this.type}-projects-list`)! as HTMLUListElement;
        listEl!.innerHTML = '';
        for (const item of this.assignedProjects) {
            new ProjectItem(`${this.type}-projects-list`, item);
        }
    }
}

//ProjectInput Class
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{
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
        const isValid = !(!this.validate({value: this.titleInput.value, required: true, minLength: 5})
            || !this.validate({value: this.descInput.value, required: true, minLength: 5})
            || !this.validate({value: +this.peopleInput.value, required: true, min: 1, max: 5}));

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

