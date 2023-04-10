import {ICONS} from './icons';
/**
 * A custom element that displays a message.
 *
 * @element success-icon
 */
export class SvgIcon extends HTMLElement {
  /**
   * Returns an array of attribute names to observe for changes.
   *
   * @return {Array<string>} An array of attribute names to observe.
   */
  static get observedAttributes() {
    return ['size', 'name'];
  }
  /**
   * constructor
   */
  constructor() {
    super();
  }

  /**
   * apply size attribute
   */
  connectedCallback() {
    const size = this.getAttribute('size');
    const name = this.getAttribute('name');
    let svg = ICONS[name];
    if (svg) {
      svg = svg.replace('<svg', `<svg width="${size}" height="${size}"`);
      this.innerHTML = svg;
    }
  }

  /**
   * apply changes
   * @param {string} name name of the attribute
   * @param {string} oldValue old value
   * @param {string} newValue new value
   */
  attributeChangedCallback(
      name: string, oldValue: string | null, newValue: string | null) {
    if (name === 'size' && oldValue !== newValue) {
      this.connectedCallback();
    }
    if (name === 'name' && oldValue !== newValue) {
      this.connectedCallback();
    }
  }
}
