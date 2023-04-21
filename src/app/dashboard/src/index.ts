import {overwriteElementPrototypes} from './dom/dom';
import {
  showBadges, updateChecklist, updateHighlight} from './highlight/highlight';
import {SvgIcon} from './svgIcon/svgIcon';
import {Badge} from './badge/badge';
import {
  getServices, getStreets, loadServices,
  loadStreets} from './dataService/data';
import {MATCHED, DB, TYPES} from './types';


overwriteElementPrototypes();
export const fake = () => {
  console.log('faker');
};

customElements.define('svg-icon', SvgIcon);
customElements.define('badge-element', Badge);

// const blackList = ['das', 'ist', 'ein']; // IDEA
document.addEventListener('DOMContentLoaded', () => {
  loadStreets('geo/streets.json');
  loadServices('geo/services.json');
  const div = document.getElementById('divId');
  const checklist = document.querySelector('.checklist');
  const textarea = document.querySelector('#free-textarea');
  textarea.addEventListener('input', (event: InputEvent) => {
    const DATA: DB = {
      location: getStreets(),
      type: getServices(),
    };

    const rawValue = (event.target as HTMLTextAreaElement).value;
    checklist.classList.toggle('show-checklist', rawValue.length > 0);
    let highlighted = rawValue;
    const MATCHED: MATCHED = {
      'type': [],
      'location': [],
    };
    const types: TYPES = ['type', 'location'];

    types.forEach((type) => {
      const result = updateHighlight(DATA, type, rawValue, highlighted);
      highlighted = result.highlighted;
      MATCHED[type] = result.matched;
    });

    showBadges(MATCHED);
    updateChecklist(checklist, MATCHED);
    if (div) {
      div.innerHTML = highlighted;
    }
    (event.target as HTMLTextAreaElement).value = rawValue;
  });
});
