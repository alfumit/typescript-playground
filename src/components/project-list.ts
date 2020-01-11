import { Component } from "./base-component.js";
import { Autobind } from "../decorators/autobind.js";
import { DragTarget } from "../models/dnd-interfaces.js";
import { Project, ProjectStatus } from "../models/project-model.js";
import { projectState } from "../state/project-state.js";
import { ProjectItem } from "./project-item.js";

//ProjectList Class
export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
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
        this.element.addEventListener("dragover", this.dragOverHandler);
        this.element.addEventListener("dragleave", this.dragLeaveHandler);
        this.element.addEventListener("drop", this.dropHandler);
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

    @Autobind
    dragLeaveHandler(event: DragEvent): void {
        const listEl = this.element.querySelector("ul")!;
        listEl.classList.remove("droppable");
    }

    @Autobind
    dragOverHandler(event: DragEvent): void {
        if(event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
            event.preventDefault();
            const listEl = this.element.querySelector("ul")!;
            listEl.classList.add("droppable");
        }
    }

    @Autobind
    dropHandler(event: DragEvent): void {
        const projectId = event.dataTransfer!.getData("text/plain");
        if(this.type === 'active') {
            projectState.moveProject(projectId, ProjectStatus.Active);
        } else {
            projectState.moveProject(projectId, ProjectStatus.Finished);
        }
    }
}
