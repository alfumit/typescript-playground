import { Component } from "./base-component";
import { Autobind } from "../decorators/autobind";
import { Draggable } from "../models/dnd-interfaces";
import { Project } from "../models/project-model";
import {projectState} from "../state/project-state";

//ProjectItem Class
export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
    constructor(public hostElementId: string, public prj: Project) {
        super("single-project", hostElementId, prj.id);
        this.renderContent();
        this.configure();
    }

    renderContent(): void {
        this.element.querySelector("h2")!.innerText =  this.prj.title;
        this.element.querySelector("h3")!.innerText =  `Number of people involved: ${this.prj.people.toString()}`;
        this.element.querySelector("p")!.innerText =  this.prj.description;
    }

    configure(): void {
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragend', this.dragEndHandler);
        const closeBtn = this.element.querySelector(".close")!;
        closeBtn.addEventListener('click', this.removeItem)
    }

    @Autobind
    dragStartHandler(event: DragEvent): void {
        event.dataTransfer!.setData("text/plain", this.prj.id);
        event.dataTransfer!.effectAllowed = "move";
    }

    @Autobind
    dragEndHandler(event: DragEvent): void {
        console.log("DragEnd");
    }

    @Autobind
    removeItem(_: Event) {
        projectState.removeProject(this.prj.id);
    }
}
