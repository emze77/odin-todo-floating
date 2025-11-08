
import { createAndAppend } from "./utils.js";
// import { themeColors } from "./project-space.js";

// '##::::'##::::'###::::'####:'##::: ##:
//  ###::'###:::'## ##:::. ##:: ###:: ##:
//  ####'####::'##:. ##::: ##:: ####: ##:
//  ## ### ##:'##:::. ##:: ##:: ## ## ##:
//  ##. #: ##: #########:: ##:: ##. ####:
//  ##:.:: ##: ##.... ##:: ##:: ##:. ###:
//  ##:::: ##: ##:::: ##:'####: ##::. ##:
// ..:::::..::..:::::..::....::..::::..::

export function createDomMainInput() {
  createAndAppend(
    "input",
    "main-block",
    "main-input",
    "",
    { placeholder: "What's To Do?", maxlength: 30 },
    "",
    "main-block__input-field"
  );
}

export function clearMainInput() {
  const main = document.querySelector("#main-block__input-field");
  while (main.hasChildNodes()) {
    main.removeChild(main.firstChild);
  }
}

// :'######:::::'###::::'########::'########:::'######::
// '##... ##:::'## ##::: ##.... ##: ##.... ##:'##... ##:
//  ##:::..:::'##:. ##:: ##:::: ##: ##:::: ##: ##:::..::
//  ##:::::::'##:::. ##: ########:: ##:::: ##:. ######::
//  ##::::::: #########: ##.. ##::: ##:::: ##::..... ##:
//  ##::: ##: ##.... ##: ##::. ##:: ##:::: ##:'##::: ##:
// . ######:: ##:::: ##: ##:::. ##: ########::. ######::
// :......:::..:::::..::..:::::..::........::::......:::




// '########::'########:::'#######::::::::'##:'########::'######::'########::'######::
//  ##.... ##: ##.... ##:'##.... ##::::::: ##: ##.....::'##... ##:... ##..::'##... ##:
//  ##:::: ##: ##:::: ##: ##:::: ##::::::: ##: ##::::::: ##:::..::::: ##:::: ##:::..::
//  ########:: ########:: ##:::: ##::::::: ##: ######::: ##:::::::::: ##::::. ######::
//  ##.....::: ##.. ##::: ##:::: ##:'##::: ##: ##...:::: ##:::::::::: ##:::::..... ##:
//  ##:::::::: ##::. ##:: ##:::: ##: ##::: ##: ##::::::: ##::: ##:::: ##::::'##::: ##:
//  ##:::::::: ##:::. ##:. #######::. ######:: ########:. ######::::: ##::::. ######::
// ..:::::::::..:::::..:::.......::::......:::........:::......::::::..::::::......:::

export function createDomProject(projectData, iterator) {
  createAndAppend(
    "button",
    "main-block",
    `project-button-${iterator}`,
    "main-block__project-button",
    { "data-uuid": projectData.uuid },
    projectData.name,
    "main-block__project-space"
  );
}

export function createDomAddProjectButton() {
  createAndAppend(
    "button",
    "main-block",
    "add-project-button",
    "main-block__project-button",
    { theme: "grey" },
    "+",
    "main-block__project-space"
  );
}

export function clearProjectSpace() {
  const projectSpace = document.querySelector("#main-block__project-space");
  while (projectSpace.hasChildNodes()) {
    projectSpace.removeChild(projectSpace.firstChild);
  }
}

// '########::'####::::'###::::'##::::::::'#######:::'######:::
//  ##.... ##:. ##::::'## ##::: ##:::::::'##.... ##:'##... ##::
//  ##:::: ##:: ##:::'##:. ##:: ##::::::: ##:::: ##: ##:::..:::
//  ##:::: ##:: ##::'##:::. ##: ##::::::: ##:::: ##: ##::'####:
//  ##:::: ##:: ##:: #########: ##::::::: ##:::: ##: ##::: ##::
//  ##:::: ##:: ##:: ##.... ##: ##::::::: ##:::: ##: ##::: ##::
//  ########::'####: ##:::: ##: ########:. #######::. ######:::
// ........:::....::..:::::..::........:::.......::::......::::

export function renderProjectForm(isExisting, projectData, themeColors) {
  let title;
  let projectName;

  if (isExisting) {
    title = "Edit Project:";
    projectName = projectData.name;
  } else {
    title = "New Project:";
    projectName = "";
  }

  createAndAppend(
    "h2",
    "dialog",
    "title",
    "",
    "",
    `${title}`,
    "dialog__content"
  );
  createAndAppend(
    "label",
    "dialog",
    "project-name-label",
    "dialog__label",
    { for: "dialog__project-name-input" },
    "Project Name:",
    "dialog__content"
  );

  createAndAppend(
    "input",
    "dialog",
    "project-name-input",
    "dialog__input",
    {
      type: "text",
      maxlength: "25",
      name: "dialog__input",
      value: projectName,
      placeholder: projectName,
    },
    projectName,
    "dialog__project-name-label"
  );

  createAndAppend(
    "fieldset",
    "dialog",
    "theme-fieldset",
    "dialog__fieldset",
    "",
    "",
    "dialog__content"
  );
  createAndAppend(
    "legend",
    "dialog",
    "theme-legend",
    "",
    "",
    "Choose Theme:",
    "dialog__theme-fieldset"
  );

  // create a radio-button for every theme color
  for (let i = 0; i < themeColors.length; i++) {
    createAndAppend(
      "span",
      "dialog",
      `radio-button-container-${themeColors[i]}`,
      "dialog__radio-button-container",
      { style: `background-color: var(--${themeColors[i]}-6)` },
      "",
      "dialog__theme-fieldset"
    );

    createAndAppend(
      "input",
      "dialog",
      `radio-button-theme-${themeColors[i]}`,
      ["dialog__radio-button", "dialog__radio-button-theme"],
      { type: "radio", name: "theme", value: themeColors[i] },
      "",
      `dialog__radio-button-container-${themeColors[i]}`
    );
  }
}

export function clearDialog() {
  while (dialog.hasChildNodes()) {
    dialog.removeChild(dialog.firstChild);
  }
}

export function renderDialogFrame(
  hasConfirmButton = true,
  hasDeleteButton = false
) {
  createAndAppend("form", "dialog", "form", "", "", "", "dialog");
  createAndAppend("div", "dialog", "content", "", "", "", "dialog__form");

  createAndAppend("div", "dialog", "buttons", "", "", "", "dialog__form");
  createAndAppend(
    "button",
    "dialog",
    "cancel-button",
    "dialog__button",
    { value: "cancel", formmethod: "dialog" },
    "Cancel",
    "dialog__buttons"
  );

  if (hasDeleteButton) {
    createAndAppend(
      "button",
      "dialog",
      "delete-button",
      "dialog__button",
      "",
      "Delete",
      "dialog__buttons"
    );
  }

  if (hasConfirmButton) {
    createAndAppend(
      "button",
      "dialog",
      "confirm-button",
      "dialog__button",
      { value: "default", formmethod: "dialog" },
      "Okay",
      "dialog__buttons"
    );
  }
}
