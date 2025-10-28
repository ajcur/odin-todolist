import "./styles.css";
import { defaultProject, Project } from "./projects.js";
import { ToDo } from "./todo.js";
import { app, allToDos, allProjects, priorityList } from "./ui.js";

new ToDo("To-Do 1", 0, new Date(2025, 10, 14));
new ToDo("To-Do 2", 0, new Date(), priorityList[1]);
new ToDo("To-Do 3", 0, new Date(), priorityList[3]);

new Project("Project 1", 0, "white");
new Project("Project 2", 0, "white");

console.log(allProjects.getList()[1]);

allProjects.getList()[1].addToDo(allToDos.getList()[0]);
// /* project1.addToDo(toDo2);
// project2.addToDo(toDo3); */

allToDos.getList()[1].deleteToDo();
allProjects.getList()[2].deleteProject();

// /* console.log(defaultProject);
// console.log(project1);
// console.log(project2); */

console.log(allToDos.getList());

// console.log(allProjects.list);
