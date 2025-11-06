import { Project } from "./classes.js";
import { openProjectDialog } from "./dialog.js";
import {
  buildDeck,
  moveHangingCardsToDefault,
} from "./deck.js";
import { themeAdjustmentMainInput } from "./input-field.js";
import {
  clearProjectSpace,
  createDomAddProjectButton,
  createDomProject,
} from "./dom.js";
import { rebuildSite } from "./index.js";
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
    styleProjectButtons.vibrant(i);
  }

  themeAdjustmentMainInput();
}

const styleProjectButtons = (function () {
  const BOTTOM_COLOR_VALUE = 5;
  const TOP_COLOR_VALUE = 7;
  let reverse = false;
  let colorValue = parseInt((BOTTOM_COLOR_VALUE + TOP_COLOR_VALUE) / 2);

  // vibrant: coloring project-buttons in different tones of current color-scheme
  const vibrant = (iterator) => {
    const currentProjectMenu = document.querySelectorAll(
      `.main-block__project-button`
    );

    // highlight current project
    if (iterator === 0) {
      currentProjectMenu[
        iterator
      ].style.borderColor = `var(--${currentProject.theme}-5)`;
      currentProjectMenu[
        iterator
      ].style.backgroundColor = `var(--${currentProject.theme}-3)`;
      currentProjectMenu[
        iterator
      ].style.color = `var(--${currentProject.theme}-9)`;
      currentProjectMenu[
        iterator
      ].style.boxShadow = `inset 2px 2px 6px var(--${currentProject.theme}-8)`;
    } else {
      currentProjectMenu[
        iterator
      ].style.borderColor = `var(--${currentProject.theme}-${colorValue})`;
      currentProjectMenu[iterator].style.backgroundColor = `var(--${
        currentProject.theme
      }-${colorValue + 2})`;
      currentProjectMenu[iterator].style.color = `var(--${
        currentProject.theme
      }-${colorValue - 2})`;
    }

    // colorValue vibrates between TOP and BOTTOM
    if (!reverse) {
      colorValue++;
      if (colorValue === TOP_COLOR_VALUE) reverse = true;
    } else {
      colorValue--;
      if (colorValue === BOTTOM_COLOR_VALUE) reverse = false;
    }
  };

  // show the scheme color of a project while hovering over the button (not in use)
  const nextThemeHint = (projectData, index) => {
    const currentProjectMenu = document.querySelector(
      `#main-block__project-button-${index}`
    );

    const currentProjectBG = currentProjectMenu.style.backgroundColor;

    currentProjectMenu.addEventListener("mouseover", () => {
      currentProjectMenu.style.backgroundColor = `var(--${allProjects[index].theme}-7)`;
    });

    currentProjectMenu.addEventListener("mouseout", function () {
      currentProjectMenu.style.backgroundColor = currentProjectBG;
    });
  };

  const highlightCurrentProject = () => {
    const currentProjectMenu = document.querySelectorAll(
      `.main-block__project-button`
    );

    currentProjectMenu[0].style.borderColor = `var(--${themeColors[0]}-8)`;
    currentProjectMenu[0].style.backgroundColor = `var(--${themeColors[0]}-6)`;
    currentProjectMenu[0].style.color = `var(--${themeColors[0]}-2)`;
  };

  return { vibrant, nextThemeHint, highlightCurrentProject };
})();

function handleProjectClick() {
  const currentProjects = document.querySelectorAll(
    ".main-block__project-button"
  );
  const addProjectButton = document.querySelector(
    "#main-block__add-project-button"
  );

  currentProjects.forEach((el, index) => {
    el.addEventListener("click", () => {
      if (el === addProjectButton) {
        console.log("Add button clicked");
        openProjectDialog(false);
      } else if (allProjects[index].uuid === currentProject.uuid) {
        // Project already opened: edit project
        openProjectDialog(true, allProjects[index]);
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
  moveHangingCardsToDefault();
  console.log(`load project-space ${allProjects[index].name}.`);
  currentProject = allProjects[index];

  //put current project first in Array
  allProjects.splice(index, 1);
  allProjects.unshift(currentProject);
  saveToLocalStorage(allProjects, "allProjects");
}

export function deleteCurrentProject(project) {
  // change all cards of the project to "default"
  moveHangingCardsToDefault(project);

  // set next project before deleting current
  switchProject(1);
  console.log("deleting project " + project.name);
  // get index of project to delete (should be 1);
  const deleteProjectIndex = allProjects.findIndex(
    (el) => el.uuid === project.uuid
  );

  // deleteCardsOfProject(project);

  // delete project
  allProjects.splice(deleteProjectIndex, 1);

  saveToLocalStorage(allProjects, "allProjects");
}
