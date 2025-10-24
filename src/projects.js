import { ToDo } from "./todo.js";

let projectList = [];

class Project {
    constructor(title, description, color) {
        this.title = title;
        this.description = description;
        this.color = color;
        this.toDos = [];
        projectList.push(this);
    }

    addToDo(toDo) {
        if (toDo._project !== undefined) {
            toDo._project.removeToDo(toDo);
        }
        this.toDos.push(toDo);
        toDo.project = this;
    }

    removeToDo(toDo) {
        let newToDos = this.toDos.filter((item) => {
            return item !== toDo;
        });
        this.toDos = newToDos;
    }

    deleteProject() {
        if (this === defaultProject) {
            console.log("The default project cannot be deleted.");
        } else {
            for (let item of this.toDos) {
                defaultProject.addToDo(item);
            }
            let newProjectList = projectList.filter((item) => {
                return item !== this;
            });
            projectList = newProjectList;
        }
    }
}

const defaultProject = new Project(
    "Default",
    "These are to-dos that haven't been assigned to any other project!",
    "grey"
);

export { Project, projectList, defaultProject };
