import { Project } from "./classes.js";
import { renderProjectDialog } from "./dialog.js";
import { buildDeck } from "./deck.js";
import {
  clearProjectSpace,
  createDomAddProjectButton,
  colorDomProject,
  createDomProject,
} from "./dom.js";

export const allProjects = [];
export let currentProjectUuid;


export function handleNewProject(name, theme) {
  const newProject = new Project(name, theme);
  allProjects.unshift(newProject);
  buildProjectSpace();
}

export function buildProjectSpace () {
  clearProjectSpace();
  renderProjects();
  handleProjectClick();
  handleNewProjectClick();
}

export function renderProjects() {
  for (let i = 0; i < allProjects.length; i++) {
    createDomProject(allProjects[i], i);
    colorDomProject(allProjects[i], i);
  }
  createDomAddProjectButton();
}

function handleProjectClick () {
  const currentProjects = document.querySelectorAll(".main-block__project-button");
  currentProjects.forEach((el, index) => {
    el.addEventListener('click', () => {
     
      // Project already opened: edit project
      if (el.uuid === currentProjectUuid) {
        editProject(el.uuid);
      } else {
      // project not opened: open project-deck. 
        console.log(`load project-space ${el.name}.`)
        currentProjectUuid = el.uuid;
        const currentProjectIndex = allProjects.findIndex((item) => {
          return item.uuid === currentProjectUuid;
        })

        //put current project first in Array 
        const currentProject = allProjects[currentProjectIndex];
        allProjects.splice(currentProjectIndex, 1);
        allProjects.unshift(currentProject);

        buildProjectSpace();
        buildDeck();        
       
      }

    })
  })
}




export function handleNewProjectClick() {
  const addProjectButton = document.querySelector("#main-block__add-project-button");
  addProjectButton.addEventListener('click', () => renderProjectDialog(false))
}



function editProject() {
  // WENN Projekt ausgewählt und nochmal geklickt, dann öffnen
}
