declare global {
  // eslint-disable-next-line no-unused-vars
  interface Element {
    addClass(newClass: string): void;
    removeClass(newClass: string): void;
    toggleClass(css: string, add: boolean): void;
    changeClass(oldClass: string, newClass: string): void;
  }
}

export const overwriteElementPrototypes = () => {
  const p = Element.prototype;
  p.addClass = async function(newClass: string): Promise<void> {
    const element: Element = this;
    if (element && element.classList) {
      element.classList.add(newClass);
    }
  };
  p.removeClass = async function(old: string): Promise<void> {
    const element: Element = this; // not works with arrow function
    if (element && element.classList) {
      element.classList.remove(old);
    }
  };
  p.toggleClass = async function(css: string, add: boolean): Promise<void> {
    const element: Element = this; // not works with arrow function
    if (element && element.classList) {
      if (add) {
        element.classList.add(css);
      } else {
        element.classList.remove(css);
      }
    }
  };
  p.changeClass = async function(old: string, newClass: string): Promise<void> {
    const element: Element = this; // not works with arrow function
    if (element && element.classList) {
      element.classList.remove(old);
      element.classList.add(newClass);
    }
  };
};
