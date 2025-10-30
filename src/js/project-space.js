import { Project } from "./classes.js";
import { openProjectDialog } from "./dialog.js";
import { buildDeck } from "./deck.js";
import {
  clearProjectSpace,
  createDomAddProjectButton,
  colorDomProject,
  createDomProject,
} from "./dom.js";

export const allProjects = [];
// export let currentProjectName;
// export let currentProjectUuid;
// export let currentTheme;

export const themeColors = [
  "gray",
  "seagreen",
  "olivedrab",
  "sienna",
  "steelblue",
];
export let currentTheme = themeColors[1];
export let currentProject = allProjects[0];

export function handleNewProject(name, theme) {
  const newProject = new Project(name, theme);
  allProjects.unshift(newProject);
  buildProjectSpace();
}

export function buildProjectSpace() {
  clearProjectSpace();
  renderProjects();
  handleProjectClick();
  handleNewProjectClick();
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
    styleProjectButtons.nextThemeHint(allProjects[i]);
  }

  // colorAddProjectButton();
}

// let colorValue = BOTTOM_COLOR_VALUE

const styleProjectButtons = (function () {
  const BOTTOM_COLOR_VALUE = 5;
  const TOP_COLOR_VALUE = 7;
  let reverse = false;
  let colorValue = parseInt((BOTTOM_COLOR_VALUE + TOP_COLOR_VALUE) / 2);

  const vibrant = (iterator) => {
    const currentProject = document.querySelectorAll(
      `.main-block__project-button`
    );

    currentProject[iterator].style.borderColor = `var(--${currentTheme}-${colorValue})`;
    currentProject[iterator].style.backgroundColor = `var(--${currentTheme}-${
      colorValue + 2
    })`;
    currentProject[iterator].style.color = `var(--${currentTheme}-${colorValue - 2})`;

    if (!reverse) {
      colorValue++;
      if (colorValue === TOP_COLOR_VALUE) reverse = true;
    } else {
      colorValue--;
      if (colorValue === BOTTOM_COLOR_VALUE) reverse = false;
    }
  };

  const nextThemeHint = (projectData) => {
    const renderedProjects = document.querySelectorAll(
      ".main-block__project-button"
    );
    console.log("Theme: " + projectData.theme);

    let currentStyle;

    renderedProjects.forEach((el, index) => {
      currentStyle = el.style.backgroundColor;
      el.addEventListener("mouseover", () => {
        el.style.backgroundColor = `var(--${allProjects[index].theme}-7)`;
      });

      el.addEventListener("mouseout", function () {
        el.style.backgroundColor = currentStyle;
      });
    });
  };

  return { vibrant, nextThemeHint };
})();

// for (let i = 0; i < allProjects.length; i++) {

// console.log("Theme Color = " + projectData.theme)

// for (let i = 0; i < themeColors.length; i++) {
//   if (projectData.theme === themeColors[i]) {
//     projectBackgroundColor = `var(--${themeColors[i]}-6)`
//     // projectBorderColor = `var(--${themeColors[i]}-deep)`
//   }
// }

// currentProject.style.backgroundColor = projectBackgroundColor;
// currentProject.style.borderColor =  "var(--gray-9)";

function colorAddProjectButton() {
  const addProjectButton = document.querySelector(
    "#main-block__add-project-button"
  );
  addProjectButton.style.backgroundColor = `var(--${themeColors[0]}-5)`;
  addProjectButton.style.borderColor = `var(--${themeColors[0]}-9)`;
}

function handleProjectClick() {
  const currentProjects = document.querySelectorAll(
    ".main-block__project-button"
  );
  currentProjects.forEach((el, index) => {
    el.addEventListener("click", () => {
      // Project already opened: edit project
      if (allProjects[index].uuid === currentProject.theme) {
        editProject(allProjects[index]);
      } else {
        // project not opened: open project-deck.
        console.log(`load project-space ${el.name}.`);
        currentProject = allProjects[index];
        // const currentProjectIndex = allProjects.findIndex((item) => {
        //   return item.uuid === currentProjectUuid;
        // });

        //put current project first in Array
        const currentProject = allProjects[currentProjectIndex];
        allProjects.splice(currentProjectIndex, 1);
        allProjects.unshift(currentProject);

        buildProjectSpace();
        buildDeck();
      }
    });
  });
}

export function handleNewProjectClick() {
  const addProjectButton = document.querySelector(
    "#main-block__add-project-button"
  );
  console.log("New Project Button clicked");
  addProjectButton.addEventListener("click", () => openProjectDialog(false));
}

function editProject() {
  // WENN Projekt ausgewählt und nochmal geklickt, dann öffnen
}

// export function saveEditedProjectData() {
//   const projectName = document.querySelector(
//     "#dialog__project-name-input"
//   ).value;
//   const checkedTheme = document.querySelector(
//     'input[name="theme"]:checked'
//   ).value;
//   element.name = projectName;
//   element.theme = checkedTheme;
// }
