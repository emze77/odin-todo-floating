import { currentProject } from "./project-space";

const BOTTOM_COLOR_VALUE = 5;
const TOP_COLOR_VALUE = 7;
let reverse = false;
let colorValue = parseInt((BOTTOM_COLOR_VALUE + TOP_COLOR_VALUE) / 2);

// vibrant: coloring project-buttons in different tones of current color-scheme
export function vibrant(iterator) {
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
    currentProjectMenu[iterator].style.color = `var(--${currentProject.theme}-${
      colorValue - 2
    })`;
  }

  // colorValue vibrates between TOP and BOTTOM
  if (!reverse) {
    colorValue++;
    if (colorValue === TOP_COLOR_VALUE) reverse = true;
  } else {
    colorValue--;
    if (colorValue === BOTTOM_COLOR_VALUE) reverse = false;
  }
}
