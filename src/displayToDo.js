// import { ToDo, allToDos } from "./todo.js";
// import { Project, projectList, defaultProject } from "./projects.js";

// const contentBox = document.querySelector("#content");

// function renderToDoDisplay(toDo) {
//     let elements = (function () {
//         let container = document.createElement("div");
//         container.classList.add("to-do-item");
//         let containerColor = container.style.backgroundColor;

//         let titleDisplay = document.createElement("h3");
//         let titleEditBtn = document.createElement("button");
//         let dueDateDisplay = document.createElement("p");
//         let dueDateEditBtn = document.createElement("button");
//         let descriptionDisplay = document.createElement("p");
//         let descriptionEditBtn = document.createElement("button");
//         let projectNameDisplay = document.createElement("p");
//         let projectNameEditBtn = document.createElement("button");

//         let completeStatusBox = document.createElement("div");
//         let completeStatusSymbol = document.createElement("div");
//         let markCompleteBtn = document.createElement("button");

//         completeStatusBox.appendChild(completeStatusSymbol);
//         completeStatusBox.appendChild(markCompleteBtn);

//         return {
//             container,
//             containerColor,
//             titleDisplay,
//             titleEditBtn,
//             dueDateDisplay,
//             dueDateEditBtn,
//             descriptionDisplay,
//             descriptionEditBtn,
//             projectNameDisplay,
//             projectNameEditBtn,
//             completeStatusBox,
//             completeStatusSymbol,
//             markCompleteBtn,
//         };
//     })();

//     let clearElements = function () {
//         for (let node of elements.container.childNodes) {
//             elements.container.removeChild(node);
//         }
//     };

//     let assignColorToPriority = function (priority) {
//         let color;
//         switch (priority) {
//             case "low":
//                 break;
//             case "default":
//                 color = "green";
//                 break;
//             case "high":
//                 color = "orange";
//                 break;
//             case "very high":
//                 color = "red";
//         }
//         return color;
//     };

//     let populateElements = function () {
//         elements.containerColor = assignColorToPriority(toDo.priority);
//         elements.titleDisplay.textContent = toDo.title;
//         elements.dueDateDisplay.textContent = toDo.dueDate;
//         elements.descriptionDisplay.textContent = toDo.description;
//         elements.projectNameDisplay.textContent = toDo.project.title;

//         if (toDo.complete === true) {
//             elements.completeStatusSymbol.textContent = "☑️";
//         } else {
//             elements.completeStatusSymbol.textContent = "❌";
//         }
//     };

//     let appendElements = function (viewType) {
//         let elementsList;
//         if (viewType === "preview") {
//             elementsList = [
//                 elements.titleDisplay,
//                 elements.dueDateDisplay,
//                 elements.completeStatusBox,
//             ];
//         } else if (viewType === "fullView") {
//             elementsList = [
//                 elements.titleDisplay,
//                 elements.titleEditBtn,
//                 elements.dueDateDisplay,
//                 elements.dueDateEditBtn,
//                 elements.descriptionDisplay,
//                 elements.descriptionEditBtn,
//                 elements.projectNameDisplay,
//                 elements.projectNameEditBtn,
//                 elements.completeStatusBox,
//             ];
//         } else console.log("Preview or FullView must be selected.");

//         elementsList.forEach((item) => {
//             item.classList.add(`${viewType}-item`);
//             elements.container.appendChild(item);
//         });
//     };

//     /* let renderPreview = function () {
//         let fullViewElements = [
//             elements.titleDisplay,
//             elements.titleEditBtn,
//             elements.dueDateDisplay,
//             elements.dueDateEditBtn,
//             elements.descriptionDisplay,
//             elements.descriptionEditBtn,
//             elements.projectNameDisplay,
//             elements.projectNameEditBtn,
//             elements.completeStatusBox,
//         ];
//         container.classList.add("preview");
//         contentBox.appendChild(elements.container);

//         fullViewElements.forEach((item) => {
//             item.classList.add("full-view-item");
//             elements.container.appendChild(item);
//         });

//         contentBox.appendChild(elements.container);
//         elements.container.appendChild(elements.titleDisplay);
//         elements.container.appendChild(elements.dueDateDisplay);
//         elements.container.appendChild(elements.completeStatusBox);
//     };

//     let renderFullView = function () {
//         let fullViewElements = [
//             elements.titleDisplay,
//             elements.titleEditBtn,
//             elements.dueDateDisplay,
//             elements.dueDateEditBtn,
//             elements.descriptionDisplay,
//             elements.descriptionEditBtn,
//             elements.projectNameDisplay,
//             elements.projectNameEditBtn,
//             elements.completeStatusBox,
//         ];
//         container.classList.add("full-view");
//         contentBox.appendChild(elements.container);

//         fullViewElements.forEach((item) => {
//             item.classList.add("full-view-item");
//             elements.container.appendChild(item);
//         });
//     }; */

//     let markCompleteBtnFunction = (function () {
//         let labelBtn = function () {
//             if (toDo.complete === true) {
//                 elements.markCompleteBtn.textContent = "Mark Incomplete";
//             } else {
//                 elements.markCompleteBtn.textContent = "Mark Complete";
//             }
//         };
//         labelBtn();
//         elements.markCompleteBtn.addEventListener("click", () => {
//             if (toDo.complete === true) {
//                 toDo.complete = false;
//             } else {
//                 toDo.complete = true;
//             }
//             populateElements();
//             appendElements();
//             labelBtn();
//         });
//     })();
//     populateElements();
//     appendElements();
// }

// /* function renderToDoDisplay() {
//     contentBox.appendChild(container);
//     container.appendChild(titleDisplay);
//     container.appendChild(dueDateDisplay);
//     container.appendChild(descriptionDisplay);
//     container.appendChild(projectNameDisplay);
//     container.appendChild(completeStatusBox);
// }
//  */
// /* function renderToDoDisplay(toDo) {
//     let container = document.createElement("div");
//     container.classList.add("to-do-item");
//     container.style.backgroundColor = assignColorToPriority(toDo.priority);

//     let titleDisplay = document.createElement("h3");
//     titleDisplay.textContent = toDo.title;

//     let dueDateDisplay = document.createElement("p");
//     dueDateDisplay.textContent = `Due: ${toDo.dueDate}`;

//     let descriptionDisplay = document.createElement("p");
//     descriptionDisplay.textContent = toDo.description;

//     let projectNameDisplay = document.createElement("p");
//     if (toDo.project === defaultProject) {
//         projectNameDisplay.textContent = "No project assigned";
//     } else {
//         projectNameDisplay.textContent = toDo.project.title;
//     }

//     let completeStatusBox = document.createElement("div");
//     let completeStatusSymbol = document.createElement("div");
//     if (toDo.complete === true) {
//         completeStatusSymbol.textContent = "☑️";
//     } else {
//         completeStatusSymbol.textContent = "❌";
//     }
//     let markCompleteBtn = document.createElement("button");
//     markCompleteBtn.textContent = "Mark Complete";
//     completeStatusBox.appendChild(completeStatusSymbol);
//     completeStatusBox.appendChild(markCompleteBtn);

//     contentBox.appendChild(container);
//     container.appendChild(titleDisplay);
//     container.appendChild(dueDateDisplay);
//     container.appendChild(descriptionDisplay);
//     container.appendChild(projectNameDisplay);
//     container.appendChild(completeStatusBox);

//     return {
//         container,
//         titleDisplay,
//         dueDateDisplay,
//         descriptionDisplay,
//         projectNameDisplay,
//         completeStatusBox,
//     };
// } */

// export { renderToDoDisplay };
