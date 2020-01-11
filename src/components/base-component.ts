// Component Base Class
export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
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
