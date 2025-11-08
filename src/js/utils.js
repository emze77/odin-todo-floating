/* createAndAppends following the BEM-Methodology. 
The ID and first class are normalized. */


export function createAndAppend(
  type,
  blockName,
  elementName,
  additionalToIdClasses,
  additionalAttributes,
  inlineText,
  childOf
) {
  let element = document.createElement(`${type}`);
  if (elementName !== "" && elementName !== undefined && elementName !== null) {
    element.setAttribute("id", `${blockName}__${elementName}`);
    element.classList.add(`${blockName}__${elementName}`);
  }

  if (
    additionalAttributes !== "" &&
    addAdditionalAttributes !== undefined &&
    addAdditionalAttributes !== null
  ) {
    addAdditionalAttributes(element, additionalAttributes);
  }
  addClassesToElement(element, additionalToIdClasses);
  element.innerHTML = inlineText;

  if (childOf === "" || childOf === undefined || childOf === null) {
    document.querySelector(`#${blockName}`).appendChild(element);
  } else {
    document.querySelector(`#${childOf}`).appendChild(element);
  }
}

function addClassesToElement(element, classes) {
  if (classes === "" || classes === undefined || classes === null) {
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


// || ___LOCAL STORAGE___


// export function saveCurrentState () {
//   // saveToLocalStorage(allProjects);
//   saveToLocalStorage(allCards, "allCards");
// }

export function saveToLocalStorage(array, arrayName) {
  if (array.length === 0) {
    console.log("empty array; cannot be loaded: " + arrayName);
  }

  console.table(array)

  // set / override key-pairs 
  for (let i = 0; i < array.length; i++) {
    localStorage.setItem(`${arrayName}-${i}`, JSON.stringify(array[i]));
    console.log(`set ${array[i].title}`);
  }

  // delete overhanging key-pairs of old arrays
  let overhangingItemNumber = array.length;
  console.log("overhanging-number: " + overhangingItemNumber);

  while (localStorage.getItem(`${arrayName}-${overhangingItemNumber}`)) {
    console.log("overhanging starts");
    localStorage.removeItem(`${arrayName}-${overhangingItemNumber}`);
    overhangingItemNumber++;
  }
}

export function loadFromLocalStorage(array, arrayName) {

  let i = 0;
  let storedArrayItem = localStorage.getItem(`${arrayName}-${i}`)
  console.log("loadFromLS started!")

  while (storedArrayItem) {
    let arrayItem = JSON.parse(storedArrayItem);
    array.push(arrayItem);
    i++;
    storedArrayItem = localStorage.getItem(`${arrayName}-${i}`)
  }

  console.log("load finished!" )
}
