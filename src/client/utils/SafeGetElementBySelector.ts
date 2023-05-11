/**
 * Attempts to get an element by a selector. If unsuccessful, throws an error.
 */
export const safe_get_element_by_selector = (selector: string): Element => {
  let element: Element | null = document.querySelector(selector);
  if (element === null) {
    throw new Error("Could not find element by selector: " + selector);
  } else {
    return element;
  }
};
