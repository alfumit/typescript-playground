import { Project, ProjectStatus } from '../models/project-model.js';
class State {
    constructor() {
        this.listeners = [];
    }
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
}
export class ProjectState extends State {
    constructor() {
        super();
        this.projects = [];
    }
    static assignId() {
        this._id++;
        return this._id;
    }
    static getInstance() {
        if (this.instance)
            return this.instance;
        this.instance = new ProjectState();
        return this.instance;
    }
    addProject(title, description, numOfPeople) {
        const newProject = new Project(ProjectState.assignId().toString(), title, description, numOfPeople, ProjectStatus.Active);
        this.projects.push(newProject);
        this.updateListeners();
    }
    removeProject(id) {
        this.projects = this.projects.filter((prj) => prj.id !== id);
        this.updateListeners();
    }
    moveProject(id, newStatus) {
        const curPrj = this.projects.find((prj) => prj.id === id);
        if (curPrj && curPrj.status !== newStatus) {
            curPrj.status = newStatus;
            this.updateListeners();
        }
    }
    updateListeners() {
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
}
ProjectState._id = 0;
export const projectState = ProjectState.getInstance();
//# sourceMappingURL=project-state.js.map