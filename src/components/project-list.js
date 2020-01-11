var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from "./base-component.js";
import { Autobind } from "../decorators/autobind.js";
import { ProjectStatus } from "../models/project-model.js";
import { projectState } from "../state/project-state.js";
import { ProjectItem } from "./project-item.js";
//ProjectList Class
export class ProjectList extends Component {
    constructor(type) {
        super("project-list", "", `${type}-projects`);
        this.type = type;
        this.assignedProjects = [];
        this.configure();
        this.renderContent();
    }
    renderContent() {
        this.element.querySelector('ul').id = `${this.type}-projects-list`;
        this.element.querySelector('h2').textContent = `List of ${this.type} projects`;
    }
    configure() {
        this.element.addEventListener("dragover", this.dragOverHandler);
        this.element.addEventListener("dragleave", this.dragLeaveHandler);
        this.element.addEventListener("drop", this.dropHandler);
        projectState.addListener((projects) => {
            this.assignedProjects = projects.filter((prj) => {
                if (this.type === 'active') {
                    return prj.status === ProjectStatus.Active;
                }
                else {
                    return prj.status === ProjectStatus.Finished;
                }
            });
            this.renderProjects();
        });
    }
    renderProjects() {
        const listEl = document.querySelector(`#${this.type}-projects-list`);
        listEl.innerHTML = '';
        for (const item of this.assignedProjects) {
            new ProjectItem(`${this.type}-projects-list`, item);
        }
    }
    dragLeaveHandler(event) {
        const listEl = this.element.querySelector("ul");
        listEl.classList.remove("droppable");
    }
    dragOverHandler(event) {
        if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
            event.preventDefault();
            const listEl = this.element.querySelector("ul");
            listEl.classList.add("droppable");
        }
    }
    dropHandler(event) {
        const projectId = event.dataTransfer.getData("text/plain");
        if (this.type === 'active') {
            projectState.moveProject(projectId, ProjectStatus.Active);
        }
        else {
            projectState.moveProject(projectId, ProjectStatus.Finished);
        }
    }
}
__decorate([
    Autobind
], ProjectList.prototype, "dragLeaveHandler", null);
__decorate([
    Autobind
], ProjectList.prototype, "dragOverHandler", null);
__decorate([
    Autobind
], ProjectList.prototype, "dropHandler", null);
//# sourceMappingURL=project-list.js.map