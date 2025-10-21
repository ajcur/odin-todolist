import { format } from "../node_modules/date-fns";
import { Project, defaultProject, projectList } from "./projects.js";

let allToDos = [];
class ToDo {
    constructor(
        title,
        description,
        dueDate,
        priority = "default"
        /* project = defaultProject */
    ) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.complete = false;
        this.project = defaultProject;
        defaultProject.addToDo(this);
        allToDos.push(this);
    }

    set dueDate(newDueDate) {
        this._dueDate = format(newDueDate, "dd.MM.yyyy");
    }

    get dueDate() {
        return this._dueDate;
    }

    set priority(newPriority) {
        const acceptablePriorities = ["low", "default", "high", "very high"];
        if (acceptablePriorities.includes(newPriority)) {
            this._priority = newPriority;
        } else {
            console.log(
                "Value must be one of 'low', 'default', 'high' or 'very high'."
            );
        }
    }

    get priority() {
        return this._priority;
    }

    /*     set project(newProject) {
        if (projectList.includes(newProject)) {
            if (this._project !== undefined) {
                this._project.removeToDo(this);
            }
            this._project = newProject;
        } else {
            console.log("This project does not exist.");
        }
    } */

    set project(newProject) {
        this._project = newProject;
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

export { allToDos, ToDo };
