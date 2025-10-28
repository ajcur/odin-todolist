import { ToDo } from "./todo";
import {
    app,
    createPopupWindow,
    savePopupData,
    getToDoProperties,
    allToDos,
    priorityList,
    allProjects,
    toDoProperties,
    capitalize,
} from "./ui.js";

const toDosDisplayArea = document.querySelector("#to-dos-display-area");

class ToDoDisplay {
    constructor(toDo, viewType = "fullView", displayed = true) {
        this.linkedToDo = toDo;
        this.elements = (function () {
            let container = document.createElement("div");
            container.classList.add("to-do-item");

            let titleDisplay = document.createElement("h3");
            let titleEditBtn = document.createElement("button");
            let dueDateDisplay = document.createElement("p");
            let dueDateEditBtn = document.createElement("button");
            let priorityDisplay = document.createElement("p");
            let priorityEditBtn = document.createElement("button");
            let descriptionDisplay = document.createElement("p");
            let descriptionEditBtn = document.createElement("button");
            let projectDisplay = document.createElement("p");
            let projectEditBtn = document.createElement("button");

            let editBtns = [
                titleEditBtn,
                dueDateEditBtn,
                priorityEditBtn,
                descriptionEditBtn,
                projectEditBtn,
            ];

            for (let editBtn of editBtns) {
                editBtn.classList.add("edit-btn");
                editBtn.textContent = "Edit";
            }

            let completeStatusBox = document.createElement("div");
            completeStatusBox.classList.add("status-box");
            let completeStatusDisplay = document.createElement("div");
            let markCompleteBtn = document.createElement("button");

            completeStatusBox.appendChild(completeStatusDisplay);
            completeStatusBox.appendChild(markCompleteBtn);

            // toDosDisplayArea.appendChild(container);

            return {
                container,
                titleDisplay,
                titleEditBtn,
                dueDateDisplay,
                dueDateEditBtn,
                priorityDisplay,
                priorityEditBtn,
                descriptionDisplay,
                descriptionEditBtn,
                projectDisplay,
                projectEditBtn,
                completeStatusBox,
                completeStatusDisplay,
                markCompleteBtn,
            };
        })();
        this.viewType = viewType;
        this.displayed = displayed;
        this.title = toDo.title;
        this.dueDate = toDo.dueDate;
        this.priority = toDo.priority;
        this.description = toDo.description;
        this.project = toDo.project;
        this.complete = toDo.complete;

        this.#createBtnEvents();
        this.renderDisplay();
    }

    set viewType(newViewType) {
        this._viewType = newViewType;
    }

    get viewType() {
        return this._viewType;
    }

    set displayed(newDisplayed) {
        let alreadyHidden = this.displayed === false;
        if (newDisplayed === false && !alreadyHidden) {
            toDosDisplayArea.removeChild(this.elements.container);
        } else if (newDisplayed === true) {
            this.renderDisplay();
        }
        this._displayed = newDisplayed;
    }

    get displayed() {
        return this._displayed;
    }

    set title(newTitle) {
        this._title = newTitle;
        this.elements.titleDisplay.textContent = this._title;
    }

    get title() {
        return this._title;
    }

    set description(newDescription) {
        this._description = newDescription;
        this.elements.descriptionDisplay.textContent = this._description;
    }

    get description() {
        return this._description;
    }

    set dueDate(newDueDate) {
        this._dueDate = newDueDate;
        this.elements.dueDateDisplay.textContent = `Due ${this._dueDate}`;
    }

    get dueDate() {
        return this._dueDate;
    }

    set priority(newPriority) {
        this._priority = newPriority;
        this.elements.priorityDisplay.textContent = `${capitalize(
            this.priority.title
        )} Priority`;
        this.elements.container.style.backgroundColor = this.priority.color;
    }

    get priority() {
        return this._priority;
    }

    set project(newProject) {
        this._project = newProject;
        this.elements.projectDisplay.textContent = this.project.title;
    }

    get project() {
        return this._project;
    }

    set complete(newComplete) {
        this._complete = newComplete;

        let completeStatusText;
        let markCompleteBtnText;

        if (this.complete === true) {
            completeStatusText = "☑";
            markCompleteBtnText = "Mark Incomplete";
            this.elements.container.style.backgroundColor = "white";
        } else if (this.complete === false) {
            completeStatusText = "☒";
            markCompleteBtnText = "Mark Complete";
            this.priority = this.priority;
        } else completeStatusText = "Incorrect complete status received.";

        this.elements.completeStatusDisplay.textContent = completeStatusText;
        this.elements.markCompleteBtn.textContent = markCompleteBtnText;
    }

    get complete() {
        return this._complete;
    }

    #editPropValue(propertyName, newValue) {
        this.linkedToDo[propertyName] = newValue;

        console.log("Property was edited.");
        console.log(allToDos.getList());
    }

    #createBtnEvents() {
        let editWindow;

        let properties = getToDoProperties();
        for (let property of properties) {
            this.elements[`${property.name}EditBtn`].addEventListener(
                "click",
                () => {
                    editWindow = createPopupWindow(
                        "toDo",
                        "edit",
                        property,
                        this.linkedToDo
                    );

                    editWindow.saveBtn.addEventListener("click", () => {
                        savePopupData([property]);

                        let updatedValue = property.value;
                        if (updatedValue) {
                            this.#editPropValue(property.name, updatedValue);
                        }
                    });
                }
            );
        }

        this.elements.markCompleteBtn.addEventListener("click", () => {
            this.linkedToDo.complete =
                this.linkedToDo.complete === false ? true : false;
        });

        this.elements.container.addEventListener("click", (event) => {
            if (event.target !== this.elements.container) {
                return;
            }
            for (let otherToDo of allToDos.getList()) {
                otherToDo.display.displayed = false;
            }
            this.viewType = "fullView";
            this.renderDisplay();
        });
    }

    renderDisplay() {
        this.elements.container.replaceChildren();
        let elementsToRender;
        if (this.viewType === "preview") {
            elementsToRender = [
                this.elements.titleDisplay,
                this.elements.dueDateDisplay,
                this.elements.completeStatusBox,
            ];
        } else if (this.viewType === "fullView") {
            elementsToRender = [
                this.elements.titleDisplay,
                this.elements.titleEditBtn,
                this.elements.dueDateDisplay,
                this.elements.dueDateEditBtn,
                this.elements.descriptionDisplay,
                this.elements.descriptionEditBtn,
                this.elements.projectDisplay,
                this.elements.projectEditBtn,
                this.elements.completeStatusBox,
            ];
        } else console.log("Preview or FullView must be selected.");

        elementsToRender.forEach((item) => {
            item.classList.add(`${this.viewType}-item`);
            this.elements.container.appendChild(item);
        });
        toDosDisplayArea.appendChild(this.elements.container);
        console.log(`Display rendered for ${this.title}`);
    }

    // hideDisplay() {
    //     let alreadyHidden = this.displayed === false;
    //     this.displayed = false;
    //     if (!alreadyHidden) {
    //         toDosDisplayArea.removeChild(this.elements.container);
    //     }
    //     // if (this.elements.container.parent === toDosDisplayArea) {
    //     // }
    // }

    deleteDisplay() {
        this.elements.container.replaceChildren();
        toDosDisplayArea.removeChild(this.elements.container);
        this.elements = {};
        this.linkedToDo = {};
    }
}

export { ToDoDisplay };
