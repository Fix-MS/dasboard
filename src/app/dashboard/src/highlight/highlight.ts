import {HTMLElements, TYPE_HIGHLIGHT, MATCHED} from '../types';
import {overwriteElementPrototypes} from './../dom/dom';
import {textMatch} from '../match/match';

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
export const showBadges = (MATCHED: MATCHED) => {
  const badgeContainer = document.querySelector('#badges');
  if (badgeContainer) {
    const badges = badgeContainer.querySelectorAll('badge-element');
    badges.removeClass('visible');
    for (const type in MATCHED) {
      if (MATCHED[type]) {
        MATCHED[type].forEach((item) => {
          const label = item.matched;
          const selector = `badge-element[type="${type}"][label="${label}"`;
          const element = badgeContainer.querySelector(selector);
          if (element) {
            element.setAttribute('label', label);
            element.addClass('visible');
          } else {
            const badge = document.createElement('badge-element');
            badge.setAttribute('type', type);
            badge.setAttribute('label', label);
            badge.addClass('visible');
            badgeContainer.append(badge);
          }
        });
      }
    }
  }
};
// TODO: types
export const updateHighlight = (DATA, type, rawValue, highlighted) => {
  const matches = textMatch(DATA, type, rawValue);
  const type2: TYPE_HIGHLIGHT = {
    matches: matches,
    css: `highlight--${type}`,
  };
  highlighted = highlight(highlighted, type2);
  return {
    matched: matches,
    highlighted: highlighted,
  };
};
