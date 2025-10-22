import { ToDo } from "./todo";

class ToDoDisplay {
    constructor(toDo) {
        this.elements = (function () {
            let container = document.createElement("div");
            container.classList.add("to-do-item");
            let containerColor = container.style.backgroundColor;

            let titleDisplay = document.createElement("h3");
            let titleEditBtn = document.createElement("button");
            let dueDateDisplay = document.createElement("p");
            let dueDateEditBtn = document.createElement("button");
            let descriptionDisplay = document.createElement("p");
            let descriptionEditBtn = document.createElement("button");
            let projectNameDisplay = document.createElement("p");
            let projectNameEditBtn = document.createElement("button");

            let completeStatusBox = document.createElement("div");
            let completeStatusDisplay = document.createElement("div");
            let markCompleteBtn = document.createElement("button");

            completeStatusBox.appendChild(completeStatusDisplay);
            completeStatusBox.appendChild(markCompleteBtn);

            return {
                container,
                containerColor,
                titleDisplay,
                titleEditBtn,
                dueDateDisplay,
                dueDateEditBtn,
                descriptionDisplay,
                descriptionEditBtn,
                projectNameDisplay,
                projectNameEditBtn,
                completeStatusBox,
                completeStatusDisplay,
                markCompleteBtn,
            };
        })();
        this.viewType = "preview";
        this.displayed = true;
        this.titleText = toDo.title;
        this.dueDateText = toDo.dueDate;
        this.descriptionText = toDo.description;
        this.projectNameText = toDo.project.title;
        if (toDo.complete === true) {
            this.completeStatusText = "☑️";
        } else if (toDo.complete === false) {
            this.completeStatusText = "❌";
        } else this.completeStatusText = "Incorrect complete status received.";
    }

    set titleText(newTitleText) {
        this._titleText = newTitleText;
        this.elements.titleDisplay.textContent = this._titleText;
    }

    get titleText() {
        return this._titleText;
    }

    set dueDateText(newDueDateText) {
        this._dueDateText = newDueDateText;
        this.elements.dueDateDisplay.textContent = this._dueDateText;
    }

    get dueDateText() {
        return this._dueDateText;
    }

    set descriptionText(newDescriptionText) {
        this._descriptionText = newDescriptionText;
        this.elements.descriptionDisplay.textContent = this._descriptionText;
    }

    get descriptionText() {
        return this._descriptionText;
    }

    set projectNameText(newProjectNameText) {
        this._projectNameText = newProjectNameText;
        this.elements.projectNameDisplay.textContent = this._projectNameText;
    }

    get projectNameText() {
        return this._projectNameText;
    }

    set completeStatusText(newCompleteStatusText) {
        this._completeStatusText = newCompleteStatusText;
        this.elements.completeStatusDisplay.textContent =
            this._completeStatusText;
    }

    get completeStatusText() {
        return this._completeStatusText;
    }
}

export { ToDoDisplay };
