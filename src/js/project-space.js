import { Project } from "./classes.js";
import { openProjectDialog } from "./dialog.js";

import { buildDeck } from "../deck/deck__controller.js";
import { moveHangingCardsToDefault } from "../deck/deck__model.js";

import {
  clearProjectSpace,
  createDomAddProjectButton,
  createDomProject,
} from "./dom.js";
import { rebuildSite } from "./index.js";
import { themeAdjustmentMainInput } from "./input-field.js";
import { vibrant } from "./styling.js";
import { saveToLocalStorage } from "./utils.js";

export const allProjects = [];

export const themeColors = [
  "gray",
  "seagreen",
  "olivedrab",
  "sienna",
  "steelblue",
];
export let currentProject;

export function handleNewProject(name, theme) {
  const newProject = new Project(name, theme);
  allProjects.unshift(newProject);
  currentProject = newProject;
  saveToLocalStorage(allProjects, "allProjects");
  rebuildSite();
}

// gets called in initializing-process
export function initializeDefaultProject() {
  const defaultProjectExists = allProjects.some((el) => el.name === "default");

  if (defaultProjectExists) {
    console.log("default project is loaded");
    const defaultProjectIndex = allProjects.findIndex(
      (el) => el.name === "default"
    );
    switchProject(defaultProjectIndex);
  } else {
    handleNewProject("default", themeColors[0]);
  }
}

// || ___BUILD PROJECT SPACE____

export function buildProjectSpace() {
  clearProjectSpace();
  loadTheme();
  renderProjects();
  handleProjectClick();
}

function loadTheme() {
  const body = document.querySelector("#body");
  body.style.backgroundImage = `var(--${currentProject.theme}-bg)`;
}

export function renderProjects() {
  for (let i = 0; i < allProjects.length; i++) {
    createDomProject(allProjects[i], i);
  }
  createDomAddProjectButton();

  for (let i = 0; i < allProjects.length + 1; i++) {
    vibrant(i);
  }

  themeAdjustmentMainInput();
}


function handleProjectClick() {
  const currentProjects = document.querySelectorAll(
    ".main-block__project-button"
  );
  const addProjectButton = document.querySelector(
    "#main-block__add-project-button"
  );

  currentProjects.forEach((el, index) => {

    const clickedProject = allProjects.find((pro) => pro.uuid === el.dataset.uuid);


    el.addEventListener("click", () => {
      if (el === addProjectButton) {
        console.log("Add button clicked");
        openProjectDialog(false);
      } else if (clickedProject === currentProject) {
        // Project already opened: edit project
        openProjectDialog(true, clickedProject);
        // editProject(allProjects[index]);
      } else {
        switchProject(index);
        buildProjectSpace();
        buildDeck();
      }
    });
  });
}

// _____END OF: BUILD PROJECT SPACE_____

function switchProject(index) {
  moveHangingCardsToDefault(false, allProjects);
  console.log(`load project-space ${allProjects[index].name}.`);
  currentProject = allProjects[index];

  //put current project first in Array
  allProjects.splice(index, 1);
  allProjects.unshift(currentProject); 
  saveToLocalStorage(allProjects, "allProjects");
}

export function deleteCurrentProject(project) {
  // change all cards of the project to "default"
  moveHangingCardsToDefault(project, allProjects);

  // set next project before deleting current
  switchProject(1);
  console.log("deleting project " + project.name);
  // get index of project to delete (should be 1);
  const deleteProjectIndex = allProjects.findIndex(
    (el) => el.uuid === project.uuid
  );

  allProjects.splice(deleteProjectIndex, 1);

  saveToLocalStorage(allProjects, "allProjects");
}











