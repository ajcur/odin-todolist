import { Project } from "./projects";
import { app, allProjects } from "./ui.js";

const projectListDisplayArea = document.querySelector(
    "#project-list-display-area"
);

class ProjectDisplay {
    constructor(project) {
        this.linkedProject = project;
        // this.displayed = displayed;
        this.goToButton = this.#createGoToBtn();
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

    displayToDos() {
        for (let toDo of this.linkedProject.toDos) {
            toDo.display.displayed = true;
        }
    }

    hideToDos() {
        for (let toDo of this.linkedProject.toDos) {
            toDo.display.displayed = false;
        }
    }

    #createGoToBtn() {
        let button = document.createElement("button");
        button.classList.add("go-to-project-btn");
        button.textContent = this.linkedProject.title;
        projectListDisplayArea.appendChild(button);

        button.addEventListener("click", () => {
            for (let project of allProjects.getList()) {
                project.display.hideToDos();
            }
            this.displayToDos();
        });
        return {
            button,
        };
    }
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
