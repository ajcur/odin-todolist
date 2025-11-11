import { ToDo } from "./todo";
import { ToDoDisplay } from "./tododisplay";
import { Project } from "./projects";
import { ProjectDisplay } from "./projectsdisplay";

let popupWindow = document.querySelector("#popup-window");
let popupForm = document.querySelector("#popup-form");

let allToDos = (function () {
    let list = [];
    let getList = function () {
        return list;
    };
    let addToDo = function (toDo) {
        list.push(toDo);
    };
    let removeToDo = function (toDo) {
        let newList = list.filter((item) => {
            return item !== toDo;
        });
        list = newList;
    };
    return { getList, addToDo, removeToDo };
})();

let allProjects = (function () {
    let list = [];
    let getList = function () {
        return list;
    };
    let addProject = function (project) {
        list.push(project);
    };
    let removeProject = function (project) {
        let newList = list.filter((item) => {
            return item !== project;
        });
        list = newList;
    };
    return { getList, addProject, removeProject };
})();

const priorityList = [
    { title: "low", color: "white" },
    { title: "default", color: "rgba(117, 197, 101, 1)" },
    { title: "high", color: "rgba(244, 186, 71, 1)" },
    { title: "very high", color: "rgba(244, 71, 71, 1)" },
];

let getToDoProperties = function () {
    let properties = [
        { name: "title", element: "input", type: "text" },
        { name: "description", element: "textarea" },
        { name: "dueDate", element: "input", type: "date" },
        {
            name: "priority",
            element: "select",
            type: "dropdown",
            options: priorityList,
        },
        {
            name: "project",
            element: "select",
            type: "dropdown",
            options: allProjects.getList(),
        },
    ];
    return properties;
};

let getProjectProperties = function () {
    let properties = [
        { name: "title", element: "input", type: "text" },
        { name: "description", element: "textarea" },
    ];
    return properties;
};

const capitalize = function (word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
};

const createPropertyField = function (property, popupType, itemToEdit) {
    let propertyCapitalized = capitalize(property.name);

    let label = document.createElement("label");
    label.textContent = `${propertyCapitalized}: `;

    let inputElement = document.createElement(property.element);
    if (property.type) {
        inputElement.setAttribute("type", property.type);
    }

    if (property.options) {
        for (let option of property.options) {
            let optionElement = document.createElement("option");
            optionElement.textContent = option.title;
            inputElement.appendChild(optionElement);
        }
    }

    if (popupType === "edit") {
        property.value = itemToEdit[property.name];
    }

    inputElement.classList.add(`${property.name}-input`);
    property.inputElement = inputElement;

    popupForm.appendChild(label);
    popupForm.appendChild(inputElement);
};

const createPopupWindow = function (
    itemType,
    popupType,
    propertyToEdit,
    itemToEdit
) {
    let properties;

    if (itemType === "toDo") {
        properties = getToDoProperties();
    }

    if (itemType === "project") {
        properties = getProjectProperties();
    }

    if (popupType === "edit") {
        if (propertyToEdit.name === "project") {
            propertyToEdit.options = allProjects.getList();
        }
        createPropertyField(propertyToEdit, popupType, itemToEdit);
    } else if (popupType === "createNew") {
        console.log(properties);
        for (let property of properties) {
            console.log(property);
            createPropertyField(property, popupType);
        }
        // let propertyCapitalized = capitalize(property.name);

        // let label = document.createElement("label");
        // label.textContent = `${propertyCapitalized}: `;

        // let inputElement = document.createElement(property.element);
        // if (property.type) {
        //     inputElement.setAttribute("type", property.type);
        // }

        // if (property.options) {
        //     for (let option of property.options) {
        //         let optionElement = document.createElement("option");
        //         optionElement.textContent = option.title;
        //         inputElement.appendChild(optionElement);
        //     }
        // }

        // if (popupType === "edit") {
        //     property.value = this[property.name];
        // }

        // inputElement.classList.add(`${property.name}-input`);
        // property.inputElement = inputElement;

        // popupForm.appendChild(label);
        // popupForm.appendChild(inputElement);
    }

    let saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";

    popupForm.appendChild(saveBtn);
    popupWindow.showModal();

    return {
        properties,
        saveBtn,
    };
};

const isValidDate = function (date) {
    return date instanceof Date && !isNaN(date);
};

const savePopupData = function (properties) {
    for (let property of properties) {
        if (property.options) {
            let selectedIndex = property.inputElement.selectedIndex;
            property.value = property.options[selectedIndex];
        } else {
            property.value = property.inputElement.value;
        }
    }

    popupForm.replaceChildren();
    popupWindow.close();

    return properties;
};

const createNewItem = function (itemType, properties) {
    let title = properties.find((prop) => prop.name === "title").value;
    let description = properties.find(
        (prop) => prop.name === "description"
    ).value;
    let dueDate;
    let priority;
    let project;

    if (itemType === "toDo") {
        dueDate = properties.find((prop) => prop.name === "dueDate").value;
        priority = properties.find((prop) => prop.name === "priority").value;
        project = properties.find((prop) => prop.name === "project").value;
    }

    if (itemType === "toDo") {
        new ToDo(
            title,
            description,
            isValidDate(dueDate) ? dueDate : new Date(),
            priority,
            project
        );
    } else if (itemType === "project") {
        new Project(title, description);
    }

    console.log(allToDos);
};

const app = (function () {
    const newToDoBtn = document.querySelector("#new-to-do-btn");
    newToDoBtn.addEventListener("click", () => {
        let newPopupWindow = createPopupWindow("toDo", "createNew");
        newPopupWindow.saveBtn.addEventListener("click", () => {
            let properties = savePopupData(newPopupWindow.properties);
            createNewItem("toDo", properties);
        });
    });

    const newProjectBtn = document.querySelector("#new-project-btn");
    newProjectBtn.addEventListener("click", () => {
        let newPopupWindow = createPopupWindow("project", "createNew");
        newPopupWindow.saveBtn.addEventListener("click", () => {
            let properties = savePopupData(newPopupWindow.properties);
            createNewItem("project", properties);
        });
    });

    const allToDosBtn = document.querySelector("#show-all-to-dos-btn");
    allToDosBtn.addEventListener("click", () => {
        for (let project of allProjects.getList()) {
            project.display.fullViewDisplayed = false;
        }
        for (let toDo of allToDos.getList()) {
            toDo.display.viewType = "preview";
            toDo.display.displayed = true;
        }
    });
})();

export {
    app,
    allToDos,
    allProjects,
    priorityList,
    getToDoProperties,
    getProjectProperties,
    createPopupWindow,
    savePopupData,
    capitalize,
};
