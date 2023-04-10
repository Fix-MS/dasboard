import {HTMLElements, TYPE_HIGHLIGHT} from '../types';
import {overwriteElementPrototypes} from './../dom/dom';

overwriteElementPrototypes();
export const highlight = (newStr: string, type: TYPE_HIGHLIGHT) => {
  const matches = type.matches;
  const css = type.css;
  matches.forEach((_match) => {
    const raw = _match.matched;
    newStr = newStr.replace(raw, `<span class='${css}'>${raw}</span>`);
  });
  return newStr;
};

export const updateChecklist = (checklist: Element, MATCHED: any) => {
  const issues: HTMLElements = checklist.querySelectorAll('[issue-check]');
  issues.forEach((issue) => {
    const type: string = issue.getAttribute('issue-check');
    const item = checklist.querySelector(`[issue-check="${type}"]`);
    const svg = item.querySelector('svg-icon');
    if (svg) {
      svg.toggleClass('success', MATCHED[type].length > 0);
    }
  });
};
