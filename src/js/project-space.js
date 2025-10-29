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
const themeColors = ["grey", "green", "red", "yellow", "blue"]
export let currentProjectName;
export let currentProjectUuid;

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
    colorProjectButtons(allProjects[i], i);
  }
  createDomAddProjectButton();
  colorAddProjectButton();
}

function colorProjectButtons(projectData, iterator) {
  const currentProject = document.querySelector(
    `#main-block__project-button-${iterator}`
  );
  let projectBackgroundColor;
  let projectBorderColor;

  console.log("Theme Color = " + projectData.theme)

  for (let i = 0; i < themeColors.length; i++) {
    if (projectData.theme === themeColors[i]) {
      projectBackgroundColor = `var(--${themeColors[i]}-accent-trans)`
      // projectBorderColor = `var(--${themeColors[i]}-deep)`
    }
  }

  currentProject.style.backgroundColor = projectBackgroundColor;
  currentProject.style.borderColor =  "var(--gray-9)";
}

function colorAddProjectButton () {
  const addProjectButton = document.querySelector("#main-block__add-project-button");
  addProjectButton.style.backgroundColor = "var(--grey-accent-trans";
  addProjectButton.style.borderColor = "var(--gray-9)";

}

function handleProjectClick() {
  const currentProjects = document.querySelectorAll(
    ".main-block__project-button"
  );
  currentProjects.forEach((el, index) => {
    el.addEventListener("click", () => {
      // Project already opened: edit project
      if (el.uuid === currentProjectUuid) {
        editProject(el.uuid);
      } else {
        // project not opened: open project-deck.
        console.log(`load project-space ${el.name}.`);
        currentProjectUuid = el.uuid;
        currentProjectName = el.name;
        const currentProjectIndex = allProjects.findIndex((item) => {
          return item.uuid === currentProjectUuid;
        });

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
