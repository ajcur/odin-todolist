import "./styles.css";
import { defaultProject, Project, projectList } from "./projects.js";
import ToDo from "./todo.js";

let toDo1 = new ToDo("toDo1", 0, new Date(2025, 10, 14));

let project1 = new Project("project1", 0, 0);

project1.addToDo(toDo1);
