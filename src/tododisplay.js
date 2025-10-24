import { ToDo, allToDos } from "./todo";

const contentBox = document.querySelector("#content");
const editFieldWindow = document.querySelector("#edit-field-window");
const editFieldForm = document.querySelector("#edit-field-form");
// const newInput = document.querySelector("#new-value");
// const newInputValueLabel = document.querySelector("#new-value-label");
// const saveEditBtn = document.querySelector("#save-edit-button");

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
            let descriptionDisplay = document.createElement("p");
            let descriptionEditBtn = document.createElement("button");
            let projectNameDisplay = document.createElement("p");
            let projectNameEditBtn = document.createElement("button");

            let editBtns = [
                titleEditBtn,
                dueDateEditBtn,
                descriptionEditBtn,
                projectNameEditBtn,
            ];

            for (let editBtn of editBtns) {
                editBtn.classList.add("edit-btn");
                editBtn.textContent = "Edit";
            }

            let completeStatusBox = document.createElement("div");
            let completeStatusDisplay = document.createElement("div");
            let markCompleteBtn = document.createElement("button");

            completeStatusBox.appendChild(completeStatusDisplay);
            completeStatusBox.appendChild(markCompleteBtn);

            contentBox.appendChild(container);

            return {
                container,
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
        this.viewType = viewType;
        this.displayed = displayed;
        this.title = toDo.title;
        this.dueDate = toDo.dueDate;
        this.description = toDo.description;
        this.project = toDo.project;
        this.complete = toDo.complete;

        this.#createBtnEvents();
    }

    set viewType(newViewType) {
        this._viewType = newViewType;
        this.renderDisplay();
    }

    get viewType() {
        return this._viewType;
    }

    set displayed(newDisplayed) {
        if (newDisplayed === true || newDisplayed === false) {
            this._displayed = newDisplayed;
        } else console.log("Value must be either true or false.");
        this.renderDisplay();
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

    set dueDate(newDueDate) {
        this._dueDate = newDueDate;
        this.elements.dueDateDisplay.textContent = this._dueDate;
    }

    get dueDate() {
        return this._dueDate;
    }

    set description(newDescription) {
        this._description = newDescription;
        this.elements.descriptionDisplay.textContent = this._description;
    }

    get description() {
        return this._description;
    }

    set project(newProject) {
        this._project = newProject;
        this.elements.projectNameDisplay.textContent = this._project.title;
        this.elements.container.style.backgroundColor = this._project.color;
    }

    get project() {
        return this._project;
    }

    set complete(newComplete) {
        this._complete = newComplete;

        let completeStatusText;
        let markCompleteBtnText;

        if (this.complete === true) {
            completeStatusText = "☑️";
            markCompleteBtnText = "Mark Incomplete";
        } else if (this.complete === false) {
            completeStatusText = "❌";
            markCompleteBtnText = "Mark Complete";
        } else completeStatusText = "Incorrect complete status received.";

        this.elements.completeStatusDisplay.textContent = completeStatusText;
        this.elements.markCompleteBtn.textContent = markCompleteBtnText;
    }

    get complete() {
        return this._complete;
    }

    #createEditDialog = function (property, type, defaultValue) {
        let newValueInput;
        let propertyCapitalized = (function () {
            return property.charAt(0).toUpperCase() + property.slice(1);
        })();
        if (type === "textarea") {
            newValueInput = document.createElement("textarea");
        } else {
            newValueInput = document.createElement("input");
            newValueInput.setAttribute("type", type);
        }
        newValueInput.setAttribute("id", `new-${property}-input`);
        newValueInput.setAttribute("value", defaultValue);
        let newValueInputLabel = document.createElement("label");
        newValueInputLabel.setAttribute("for", newValueInput.id);
        newValueInputLabel.textContent = `${propertyCapitalized}: `;
        let saveEditBtn = document.createElement("button");
        saveEditBtn.textContent = "Save";

        editFieldForm.appendChild(newValueInputLabel);
        editFieldForm.appendChild(newValueInput);
        editFieldForm.appendChild(saveEditBtn);

        return {
            newValueInput,
            saveEditBtn,
        };
    };

    #resetEditDialog = function () {
        editFieldForm.replaceChildren();
    };

    #editPropValue = function (propertyName, newValue) {
        this.linkedToDo[propertyName] = newValue;

        console.log("Property was edited.");
        console.log(allToDos);
    };

    #createBtnEvents = function () {
        let editableProperties = [
            { name: "title", type: "text" },
            { name: "dueDate", type: "date" },
            {
                name: "description",
                type: "textarea",
                default: this.description,
            },
        ];
        let editDialog;

        for (let property of editableProperties) {
            this.elements[`${property.name}EditBtn`].addEventListener(
                "click",
                () => {
                    property.defaultValue = this[property.name];
                    editDialog = this.#createEditDialog(
                        property.name,
                        property.type,
                        property.defaultValue
                    );
                    editFieldWindow.showModal();
                    editDialog.saveEditBtn.addEventListener("click", () => {
                        let newValue = editDialog.newValueInput.value;
                        if (newValue) {
                            this.#editPropValue(property.name, newValue);
                        }
                        this.#resetEditDialog();
                        editFieldWindow.close();
                    });
                }
            );
        }

        this.elements.markCompleteBtn.addEventListener("click", () => {
            if (this.linkedToDo.complete === false) {
                this.linkedToDo.complete === true;
            } else if (this.linkedToDo.complete === true) {
                this.linkedToDo.complete === false;
            } else console.log("Incorrect complete status received.");
        });
    };

    renderDisplay() {
        this.elements.container.replaceChildren();
        if (this.displayed === false) {
            return;
        }
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
                this.elements.projectNameDisplay,
                this.elements.projectNameEditBtn,
                this.elements.completeStatusBox,
            ];
        } else console.log("Preview or FullView must be selected.");

        elementsToRender.forEach((item) => {
            item.classList.add(`${this.viewType}-item`);
            this.elements.container.appendChild(item);
        });
    }

    deleteDisplay() {
        this.elements.container.replaceChildren();
        this.elements = {};
        this.linkedToDo = {};
    }
}

export { ToDoDisplay };
