import { format } from "../node_modules/date-fns";
import { Project, defaultProject, projectList } from "./projects.js";

export default class ToDo {
    constructor(
        title,
        description,
        dueDate,
        priority = 2,
        project = defaultProject
    ) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
        this.complete = false;
    }

    set dueDate(newDueDate) {
        this._dueDate = format(newDueDate, "dd.MM.yyyy");
    }

    get dueDate() {
        return this._dueDate;
    }

    set priority(newPriority) {
        const acceptablePriorities = [1, 2, 3, 4];
        if (acceptablePriorities.includes(newPriority)) {
            this._priority = newPriority;
        } else {
            console.log("Value must be a whole number between 1 to 4.");
        }
    }

    get priority() {
        return this._priority;
    }

    set project(newProject) {
        if (projectList.includes(newProject)) {
            if (this._project !== undefined) {
                this._project.removeToDo(this);
            }
            this._project = newProject;
        } else {
            console.log("This project does not exist.");
        }
    }

    get project() {
        return this._project;
    }

    set complete(newComplete) {
        if (newComplete === true || newComplete === false) {
            this._complete = newComplete;
        } else {
            console.log("Value must be either true or false.");
        }
    }

    get complete() {
        return this._complete;
    }
}
