var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from "./base-component.js";
import { Autobind } from "../decorators/autobind.js";
//ProjectItem Class
export class ProjectItem extends Component {
    constructor(hostElementId, prj) {
        super("single-project", hostElementId, prj.id);
        this.hostElementId = hostElementId;
        this.prj = prj;
        this.renderContent();
        this.configure();
    }
    renderContent() {
        this.element.querySelector("h2").innerText = this.prj.title;
        this.element.querySelector("h3").innerText = `Number of people involved: ${this.prj.people.toString()}`;
        this.element.querySelector("p").innerText = this.prj.description;
    }
    configure() {
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragend', this.dragEndHandler);
    }
    dragStartHandler(event) {
        event.dataTransfer.setData("text/plain", this.prj.id);
        event.dataTransfer.effectAllowed = "move";
    }
    dragEndHandler(event) {
        console.log("DragEnd");
    }
}
__decorate([
    Autobind
], ProjectItem.prototype, "dragStartHandler", null);
__decorate([
    Autobind
], ProjectItem.prototype, "dragEndHandler", null);
//# sourceMappingURL=project-item.js.map