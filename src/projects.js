import { ToDo } from "./todo.js";
import { app, allToDos, allProjects } from "./ui.js";
import { ProjectDisplay } from "./projectsdisplay.js";

class Project {
    constructor(title, description) {
        this.title = title;
        this.description = description;
        this.display = new ProjectDisplay(this);
        this.toDos = [];
        allProjects.addProject(this);
    }

    addToDo(toDo) {
        if (toDo.project !== undefined) {
            toDo.project.removeToDo(toDo);
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
            this.display.deleteDisplay();
            allProjects.removeProject(this);
        }
    }
}

const defaultProject = new Project(
    "Default",
    "These are to-dos that haven't been assigned to any other project!",
    "grey"
);

export { Project, defaultProject };
