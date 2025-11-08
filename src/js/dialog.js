import {
  renderDialogFrame,
  renderProjectForm,
} from "./dom.js";
import { clearSite } from "./index.js";
import {
  currentProject,
  deleteCurrentProject,
  handleNewProject,
  themeColors
} from "./project-space.js";

export const dialog = document.querySelector("#dialog");

// '########::'########:::'#######::::::::'##:'########::'######::'########::'######::
//  ##.... ##: ##.... ##:'##.... ##::::::: ##: ##.....::'##... ##:... ##..::'##... ##:
//  ##:::: ##: ##:::: ##: ##:::: ##::::::: ##: ##::::::: ##:::..::::: ##:::: ##:::..::
//  ########:: ########:: ##:::: ##::::::: ##: ######::: ##:::::::::: ##::::. ######::
//  ##.....::: ##.. ##::: ##:::: ##:'##::: ##: ##...:::: ##:::::::::: ##:::::..... ##:
//  ##:::::::: ##::. ##:: ##:::: ##: ##::: ##: ##::::::: ##::: ##:::: ##::::'##::: ##:
//  ##:::::::: ##:::. ##:. #######::. ######:: ########:. ######::::: ##::::. ######::
// ..:::::::::..:::::..:::.......::::......:::........:::......::::::..::::::......:::

export function openProjectDialog(isExisting, element) {
  clearSite();

  if (isExisting && element.name === "default") {
    renderDialogFrame(true, false);
  } else {
    renderDialogFrame(true, isExisting);
  }

  renderProjectForm(isExisting, element, themeColors);

  if (isExisting) {
    preSelectProjectTheme();
  } else {
    randomSelectProjectTheme();
  }

  createProjectConfirmEvent(isExisting, element);

  if (isExisting && element.name !== "default") {
    createProjectDeleteEvent(element);
  }

  dialog.showModal();
}

function preSelectProjectTheme() {
  const currentTheme = currentProject.theme;
  const currentThemeButton = document.querySelector(
    `#dialog__radio-button-theme-${currentTheme}`
  );
  currentThemeButton.setAttribute("checked", "checked");
}

function randomSelectProjectTheme() {
  const randomIndex = Math.floor(Math.random() * themeColors.length);
  const randomizedThemeButton = document.querySelector(
    `#dialog__radio-button-theme-${themeColors[randomIndex]}`
  );
  randomizedThemeButton.setAttribute("checked", "checked");
}

function createProjectConfirmEvent(isExisting, element) {
  const dialogConfirmButton = document.querySelector("#dialog__confirm-button");
  const dialogForm = document.querySelector("#dialog__form");

  dialogForm.addEventListener("keydown", (event) => {
    // console.log("project key pressed: " + event.key)
    if (event.key == "Enter") {
      // console.log("project key is enter")
      dialogConfirmButton.click();
    }
  });

  dialogConfirmButton.addEventListener("click", () => {
    const projectName = document.querySelector(
      "#dialog__project-name-input"
    ).value;
    const checkedTheme = document.querySelector(
      'input[name="theme"]:checked'
    ).value;

    if (isExisting) {
      element.name = projectName;
      element.theme = checkedTheme;
    } else {
      handleNewProject(projectName, checkedTheme);
    }
  });
}

function createProjectDeleteEvent(element) {
  const dialogDeleteButton = document.querySelector("#dialog__delete-button");
  // console.log(
  //   element.name + " " + allProjects.indexOf((el) => el.uuid === element.uuid)
  // );

  dialogDeleteButton.addEventListener("click", (event) => {
    event.preventDefault();
    deleteCurrentProject(element);
    dialog.close();
  });
}

// :'######:::::'###::::'########::'########:::'######::
// '##... ##:::'## ##::: ##.... ##: ##.... ##:'##... ##:
//  ##:::..:::'##:. ##:: ##:::: ##: ##:::: ##: ##:::..::
//  ##:::::::'##:::. ##: ########:: ##:::: ##:. ######::
//  ##::::::: #########: ##.. ##::: ##:::: ##::..... ##:
//  ##::: ##: ##.... ##: ##::. ##:: ##:::: ##:'##::: ##:
// . ######:: ##:::: ##: ##:::. ##: ########::. ######::
// :......:::..:::::..::..:::::..::........::::......:::
