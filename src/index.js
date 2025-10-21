import "./styles.css";
import { defaultProject, Project, projectList } from "./projects.js";
import { allToDos, ToDo } from "./todo.js";
import { renderToDoDisplay } from "./displayToDo.js";

renderToDoDisplay(new ToDo("To-Do 1", 0, new Date(2025, 10, 14)));
renderToDoDisplay(new ToDo("toDo2", 0, new Date(), "high"));
new ToDo("toDo3", 0, new Date());

new Project("project1", 0, 0);
new Project("project2", 0, 0);

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
