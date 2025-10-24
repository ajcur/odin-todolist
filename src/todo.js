import { format } from "../node_modules/date-fns";
import { Project, defaultProject, projectList } from "./projects.js";
import { ToDoDisplay } from "./tododisplay.js";

let allToDos = [];
class ToDo {
    constructor(title, description, dueDate, priority = "default") {
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.complete = false;
        this.project = defaultProject;
        this.display = new ToDoDisplay(this);
        defaultProject.addToDo(this);
        allToDos.push(this);
    }

    #updateDisplay = function (property) {
        if (this.display !== undefined) {
            this.display[property] = this[property];
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

    set project(newProject) {
        this._project = newProject;
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
        let newAllToDos = allToDos.filter((item) => {
            return item !== this;
        });
        allToDos = newAllToDos;
    }
}

export { allToDos, ToDo };
