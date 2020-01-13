import { ProjectList} from "./components/project-list";
import { ProjectInput } from "./components/project-input";

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
