import { Project } from "./classes.js";
import { renderProjectDialog } from "./dialog.js";
import { clearProjectSpace, createDomAddProjectButton, colorDomProject, createDomProject } from "./dom.js";

export const projects = [];

export function renderProjects () {
  for (let i = 0; i < projects.length; i++) {
    createDomProject(projects[i], i);
    colorDomProject(projects[i], i);
  }
  createDomAddProjectButton();
}

export function clickNewProjectButton () {
    renderProjectDialog(false);
    // saveProjectData();
}

export function handleNewProject (name, theme) {
    const newProject = new Project (name, theme);
    projects.unshift(newProject);
    clearProjectSpace();
    renderProjects();
}


function editProject () {
    // WENN Projekt ausgewählt und nochmal geklickt, dann öffnen
}






// function saveProjectData () {
//     const dialogConfirmButton = document.querySelector("#dialog__confirm-button");

// }

// function createConfirmEvent(element) {
//   const dialogConfirmButton = document.querySelector("#dialog__confirm-button");

//   console.table(element)
//   // console.log("trying to edit this el: " + element)

//   dialogConfirmButton.addEventListener("click", () => {
//     const dialogDescriptionValue = document.querySelector("#dialog__description-input").value;
//     const dueDateValue = document.querySelector("#dialog__dueDate-input").value;
//     const checkedRadio = document.querySelector('input[name="prio"]:checked').value;

//     console.log("check Radio: " + checkedRadio);

//     element.priority = checkedRadio;
//     element.description = dialogDescriptionValue;
//     element.dueDate = dueDateValue;
//   })


// }



