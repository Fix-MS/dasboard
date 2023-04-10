/**
 * A custom element that displays a message.
 *
 * @element success-icon
 */
export class Badge extends HTMLElement {
  /**
   * Returns an array of attribute names to observe for changes.
   *
   * @return {Array<string>} An array of attribute names to observe.
   */
  static get observedAttributes() {
    return ['type', 'label'];
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
    const type = this.getAttribute('type');
    const label = this.getAttribute('label');
    this.innerHTML = `
    <span issue-type="${type}" class="badge bg-success">
        <svg-icon name="${type}-icon" size="14"></svg-icon>
        <span issue-value>${label}</span>
    </span>`;
  }

  /**
   * apply changes
   * @param {string} name name of the attribute
   * @param {string} oldValue old value
   * @param {string} newValue new value
   */
  attributeChangedCallback(
      name: string, oldValue: string | null, newValue: string | null) {
    if (name === 'type' && oldValue !== newValue) {
      this.connectedCallback();
    }
    if (name === 'label' && oldValue !== newValue) {
      this.connectedCallback();
    }
  }
}
