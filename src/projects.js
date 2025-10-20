import ToDo from "./todo.js";

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
        this.toDos.push(toDo);
        toDo._project = this;
    }

    removeToDo(toDo) {
        let newToDos = this.toDos.filter((item) => {
            return item != toDo;
        });
        this.toDos = newToDos;
    }
}

const defaultProject = new Project(
    "default",
    "These are to-dos that haven't been assigned to any other project!",
    "grey"
);

export { Project, projectList, defaultProject };
