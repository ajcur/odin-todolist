import "./styles.css";
import { defaultProject, Project, projectList } from "./projects.js";
import { allToDos, ToDo } from "./todo.js";
import { renderToDoDisplay } from "./displayToDo.js";

new ToDo("To-Do 1", 0, new Date(2025, 10, 14));
new ToDo("To-Do 2", 0, new Date(), "high");
new ToDo("To-Do 3", 0, new Date());

new Project("Project 1", 0, "white");
new Project("Project 2", 0, "white");

projectList[1].addToDo(allToDos[0]);
/* project1.addToDo(toDo2);
project2.addToDo(toDo3); */

allToDos[1].deleteToDo();
projectList[2].deleteProject();

/* console.log(defaultProject);
console.log(project1);
console.log(project2); */

console.log(allToDos);

console.log(projectList);
