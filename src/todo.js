import { format } from "../node_modules/date-fns";
import { app, allToDos, allProjects, priorityList, capitalize } from "./ui.js";
import { Project, defaultProject } from "./projects.js";
import { ToDoDisplay } from "./tododisplay.js";
class ToDo {
    constructor(
        title,
        description,
        dueDate = new Date(),
        priority = priorityList[1],
        project = defaultProject
    ) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.complete = false;
        project.addToDo(this);
        this.display = new ToDoDisplay(this);
        allToDos.addToDo(this);
    }

    #updateDisplay = function (property) {
        if (this.display !== undefined) {
            let propertyCapitalized = capitalize(property);
            this.display[`update${propertyCapitalized}Display`]();
            // this.display[property] = this[property];
        }
    };

    set title(newTitle) {
        this._title = newTitle;
        this.#updateDisplay("title");
    }

    get title() {
        return this._title;
    }

    set description(newDescription) {
        this._description = newDescription;
        this.#updateDisplay("description");
    }

    get description() {
        return this._description;
    }

    set dueDate(newDueDate) {
        this._dueDate = format(newDueDate, "dd.MM.yyyy");
        this.#updateDisplay("dueDate");
    }

    get dueDate() {
        return this._dueDate;
    }

    set priority(newPriority) {
        this._priority = newPriority;
        this.#updateDisplay("priority");
    }

    get priority() {
        return this._priority;
    }

    set project(newProject) {
        this._project = newProject;
        // newProject.addToDo(this);
        this.#updateDisplay("project");
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
        this.#updateDisplay("complete");
    }

    get complete() {
        return this._complete;
    }

    deleteToDo() {
        this.project.removeToDo(this);
        this.display.deleteDisplay();
        allToDos.removeToDo(this);
    }
}

export { ToDo, priorityList };
