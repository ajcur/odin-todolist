import { Project } from "./projects";
import { app, allToDos, allProjects, getProjectProperties } from "./ui.js";

const projectListDisplayArea = document.querySelector(
    "#project-list-display-area"
);

const projectFullViewDisplayArea = document.querySelector(
    "#project-full-view-display-area"
);

class ProjectDisplay {
    constructor(project, fullViewDisplayed = false) {
        this.linkedProject = project;
        this.fullViewDisplayed = fullViewDisplayed;
        this.elements = (function () {
            let goToButton = document.createElement("button");
            goToButton.classList.add("go-to-project-btn");
            projectListDisplayArea.appendChild(goToButton);

            let fullViewContainer = document.createElement("div");
            fullViewContainer.classList.add("project-full-view-container");

            let titleDisplay = document.createElement("h3");
            let titleEditBtn = document.createElement("button");
            let descriptionDisplay = document.createElement("p");
            let descriptionEditBtn = document.createElement("button");

            let editBtns = [titleEditBtn, descriptionEditBtn];

            for (let editBtn of editBtns) {
                editBtn.classList.add("edit-btn");
                editBtn.textContent = "Edit";
            }

            return {
                goToButton,
                fullViewContainer,
                titleDisplay,
                titleEditBtn,
                descriptionDisplay,
                descriptionEditBtn,
            };
        })();
        this.#createBtnEvents();
        this.updateTitleDisplay();
    }

    updateTitleDisplay() {
        this.elements.goToButton.textContent = this.linkedProject.title;
        this.elements.titleDisplay.textContent = this.linkedProject.title;
    }

    get fullViewDisplayed() {
        return this._fullViewDisplayed;
    }

    set fullViewDisplayed(newDisplayed) {
        let previouslyHidden =
            this.fullViewDisplayed === false ||
            this.fullViewDisplayed === undefined;
        if (newDisplayed === false && !previouslyHidden) {
            projectFullViewDisplayArea.removeChild(
                this.elements.fullViewContainer
            );
        } else if (newDisplayed === true && previouslyHidden) {
            for (let project of allProjects.getList()) {
                project.display.fullViewDisplayed = false;
            }
            this.renderDisplay();
        }
        this._fullViewDisplayed = newDisplayed;
    }

    #editPropValue(propertyName, newValue) {
        this.linkedProject[propertyName] = newValue;
    }

    #createBtnEvents() {
        this.elements.goToButton.addEventListener("click", () => {
            this.fullViewDisplayed = true;
            for (let toDo of allToDos.getList()) {
                if (toDo.project === this.linkedProject) {
                    toDo.display.viewType = "preview";
                    toDo.display.displayed = true;
                } else {
                    toDo.display.displayed = false;
                }
            }
        });

        let editWindow;

        let properties = getProjectProperties();
        for (let property of properties) {
            this.elements[`${property.name}EditBtn`].addEventListener(
                "click",
                () => {
                    editWindow = createPopupWindow(
                        "project",
                        "edit",
                        property,
                        this.linkedProject
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
    }

    renderDisplay() {
        let elementsToRender;
        elementsToRender = [
            this.elements.titleDisplay,
            this.elements.titleEditBtn,
            this.elements.descriptionDisplay,
            this.elements.descriptionEditBtn,
        ];

        console.log(elementsToRender);

        elementsToRender.forEach((item) => {
            item.classList.add("project-full-view-item");
            this.elements.fullViewContainer.appendChild(item);
        });
        projectFullViewDisplayArea.appendChild(this.elements.fullViewContainer);
    }

    deleteDisplay() {
        this.elements.fullViewContainer.replaceChildren();
        if (this.fullViewDisplayed === true) {
            projectFullViewDisplayArea.removeChild(
                this.elements.fullViewContainer
            );
        }
        projectListDisplayArea.removeChild(this.elements.goToButton);
        this.elements = {};
        this.linkedProject = {};
    }

    // set displayed(newDisplayed) {
    //     this._displayed = newDisplayed;
    //     if (this.linkedProject === undefined) {
    //         return;
    //     }
    //     if (newDisplayed === true) {
    //         this.#displayProject();
    //     } else {
    //         this.#hideProject();
    //     }
    // }

    // displayToDos() {
    //     for (let toDo of this.linkedProject.toDos) {
    //         toDo.display.viewType = "preview";
    //         toDo.display.displayed = true;
    //     }
    // }

    // hideToDos() {
    //     for (let toDo of this.linkedProject.toDos) {
    //         toDo.display.viewType = "preview";
    //         toDo.display.displayed = false;
    //     }
    // }

    // #createGoToBtn() {
    //     let button = document.createElement("button");
    //     button.classList.add("go-to-project-btn");
    //     button.textContent = this.linkedProject.title;
    //     projectListDisplayArea.appendChild(button);

    //     // button.addEventListener("click", () => {
    //     //     for (let project of allProjects.getList()) {
    //     //         project.display.hideToDos();
    //     //     }
    //     //     this.displayToDos();
    //     // });
    //     return button;
    // }
}

// class ProjectSelector {
//     constructor() {
//         this.menu = (function () {
//             let optionElements;
//             document.createElement("select");
//             menu.setAttribute("type", "dropdown");
//             for (let i = 0; i < projectList.length; i++) {
//                 let project = projectList[i];
//                 let optionElement = document.createElement("option");
//                 optionElement.textContent = project.title;
//                 optionElement.value = project;
//                 optionElements.push(optionElement);
//                 menu.appendChild(optionElement);
//             }
//             return { optionElements };
//         })();
//     }

//     open() {
//         this.menu
//     }
// }

// let createProjectSelector = function (element) {
//     let menuOptions;
//     let menu = document.createElement("select");
//     menu.setAttribute("type", "dropdown");
//     for (let i = 0; i < projectList.length; i++) {
//         let option = projectList[i];
//         let optionElement = document.createElement("option");
//         optionElement.textContent = option.title;
//         optionElement.value = option;
//         menuOptions.push(optionElement);
//         menu.appendChild(optionElement);
//     }
//     return { menuOptions };
// };

// let closeProjectSelector = function (menu, previousElement) {
//     menu.replaceWith(previousElement);
// };

export { ProjectDisplay };
