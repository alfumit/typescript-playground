// Component Base Class
export class Component {
    constructor(templateId, hostElementId, newElementId) {
        this.templateElement = document.getElementById(templateId);
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        if (newElementId) {
            this.element.id = newElementId;
        }
        if (hostElementId) {
            document.getElementById(hostElementId).appendChild(this.element);
        }
    }
}
//# sourceMappingURL=base-component.js.map