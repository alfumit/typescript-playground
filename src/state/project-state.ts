import  { Project, ProjectStatus } from '../models/project-model'

//State management
export type Listener<T> = (items: T[]) => void;
class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listenerFn: Listener<T>) {
        this.listeners.push(listenerFn);
    }
}
export class ProjectState extends State<Project>{
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
        this.updateListeners();
    }

    removeProject(id: string): void {
        this.projects = this.projects.filter((prj) => prj.id !== id);
        this.updateListeners();
    }

    moveProject(id: string, newStatus: ProjectStatus): void {
        const curPrj = this.projects.find((prj) => prj.id === id);
        if(curPrj && curPrj.status !== newStatus) {
            curPrj.status = newStatus;
            this.updateListeners();
        }
    }

    private updateListeners() {
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }

}

export const projectState = ProjectState.getInstance();

