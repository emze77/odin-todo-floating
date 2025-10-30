import { Project } from "./classes.js";
import { openProjectDialog, rebuildSite } from "./dialog.js";
import { buildDeck } from "./deck.js";
import { themeAdjustmentMainInput } from "./input-field.js";
import {
  clearProjectSpace,
  createDomAddProjectButton,
  createDomProject,
} from "./dom.js";


export const allProjects = [];

export const themeColors = [
  "gray",
  "seagreen",
  "olivedrab",
  "sienna",
  "steelblue",
];
// export let currentTheme = themeColors[1];
export let currentProject;

export function handleNewProject(name, theme) {
  const newProject = new Project(name, theme);
  allProjects.unshift(newProject);
  currentProject = newProject;
  rebuildSite();
  // buildProjectSpace();
}

export function buildProjectSpace() {
  clearProjectSpace();
  loadTheme();
  renderProjects();
  handleProjectClick();
  // handleNewProjectClick();
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

  for (let i = 0; i < allProjects.length; i++) {
    styleProjectButtons.nextThemeHint(allProjects[i], i);
  }

  themeAdjustmentMainInput();

  // colorAddProjectButton();
}

// let colorValue = BOTTOM_COLOR_VALUE

const styleProjectButtons = (function () {
  const BOTTOM_COLOR_VALUE = 5;
  const TOP_COLOR_VALUE = 7;
  let reverse = false;
  let colorValue = parseInt((BOTTOM_COLOR_VALUE + TOP_COLOR_VALUE) / 2);

  const vibrant = (iterator) => {
    const currentProjectMenu = document.querySelectorAll(
      `.main-block__project-button`
    );

    currentProjectMenu[
      iterator
    ].style.borderColor = `var(--${currentProject.theme}-${colorValue})`;
    currentProjectMenu[iterator].style.backgroundColor = `var(--${
      currentProject.theme
    }-${colorValue + 2})`;
    currentProjectMenu[iterator].style.color = `var(--${currentProject.theme}-${
      colorValue - 2
    })`;

    if (!reverse) {
      colorValue++;
      if (colorValue === TOP_COLOR_VALUE) reverse = true;
    } else {
      colorValue--;
      if (colorValue === BOTTOM_COLOR_VALUE) reverse = false;
    }
  };

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

  return { vibrant, nextThemeHint };
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
      // Project already opened: edit project
      if (el === addProjectButton) {
        console.log("Add button clicked");
        openProjectDialog(false);
      } else if (allProjects[index].uuid === currentProject.uuid) {
        editProject(allProjects[index]);
      } else {
        switchProject(index);
      }
    });
  });
}

function switchProject(index) {
  console.log(`load project-space ${allProjects[index].name}.`);
  currentProject = allProjects[index];

  //put current project first in Array
  // const currentProject = allProjects[currentProjectIndex];
  allProjects.splice(index, 1);
  allProjects.unshift(currentProject);

  buildProjectSpace();
  buildDeck();
}

function editProject() {
  // WENN Projekt ausgewählt und nochmal geklickt, dann öffnen
}
