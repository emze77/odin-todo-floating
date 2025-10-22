/* createAndAppends following the BEM-Methology. 
The ID and first class are noramlized. */

export function createAndAppend(
  type,
  blockName,
  elementName,
  additionalToIdClasses,
  additionalAttributes,
  inlineText,
  childOf
) {
  console.log("createAndAppend started!");
  let element = document.createElement(`${type}`);
  if (elementName !== "") {
    element.setAttribute("id", `${blockName}__${elementName}`);
    element.classList.add(`${blockName}__${elementName}`);
  }

  if (additionalAttributes !== "") {
    addAdditionalAttributes(element, additionalAttributes);
  }
  addClassesToElement(element, additionalToIdClasses);
  element.innerHTML = inlineText;

  if (childOf === "" || childOf === undefined) {
      document.querySelector(`#${blockName}`).appendChild(element);
  } else {
  document.querySelector(`#${childOf}`).appendChild(element);
  }
}

function addClassesToElement(element, classes) {
  if (classes === "" || classes === undefined) {
    return;
  } else if (classes.constructor === Array) {
    for (let i = 0; i < classes.length; i++) {
      element.classList.add(classes[i]);
    }
  } else {
    element.classList.add(classes);
  }
}

function addAdditionalAttributes(element, attributes) {
  if (attributes.constructor !== Object) {
    console.log("Additional Attributes must be Object");
    return;
  }

  for (let [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value);
  }
}
