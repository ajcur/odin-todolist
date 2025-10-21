import "./styles.css";
import { defaultProject, Project, projectList } from "./projects.js";
import { allToDos, ToDo } from "./todo.js";

let toDo1 = new ToDo("toDo1", 0, new Date(2025, 10, 14));
let toDo2 = new ToDo("toDo2", 0, new Date());
let toDo3 = new ToDo("toDo3", 0, new Date());

let project1 = new Project("project1", 0, 0);
let project2 = new Project("project2", 0, 0);

project1.addToDo(toDo1);
project1.addToDo(toDo2);
project2.addToDo(toDo3);

console.log(defaultProject);
console.log(project1);
console.log(project2);

console.log(allToDos);
