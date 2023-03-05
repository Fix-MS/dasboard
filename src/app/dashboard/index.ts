// import {CONFIG} from './config';
import {streetKEYS} from 'index';
import {overwriteElementPrototypes} from './src/dom/dom';
overwriteElementPrototypes();
const db = {
  'keywords': {
    'schlagloch': {},
    'glasbruch': {},
    'verschmutzung': {synonyms: 'verschmutzt'},
  },
  'streets': {
    'wilhelmstrasse': {},
    'teststrasse': {},
  },
};

const keywords = Object.keys(db.keywords);
const SEARCH_INDEX = {};
const loadStreetSearchIndex = (streets: Array<string>) => {
  // IDEA: get first words for sensitiv index or first parts
  const optimized = [];
  streets.forEach((street) => {
    optimized.push(street.toLowerCase().replace('ß', 'ss'));
  });
  return {
    raw: streets,
    optimized: optimized,
  };
};
const loadStreets = (url: string) => {
  fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        SEARCH_INDEX['streets'] = loadStreetSearchIndex(data.streets);
      });
};
export const highlight = (rawValue, newStr, type) => {
  const value: Lowercase<string> = rawValue.trim().toLowerCase();
  const matches = type.keys;
  const css = type.css;
  // let newStr = highlighted;
  matches.forEach((keyword) => {
    const i = value.toLowerCase().indexOf(keyword);

    const raw = rawValue.substring(i, i + keyword.length);
    newStr = newStr.replace(raw, `<span class='${css}'>${raw}</span>`);
  });
  return newStr;
};
const getMatchingStreets = (value, wordZ, SEARCH_INDEX) => {
  let matchesStreets = [];
  const keys: streetKEYS = SEARCH_INDEX['streets'].optimized;
  const keysß = SEARCH_INDEX['streets'].optimized
      .map((word) => word.replaceAll('strasse', 'straße'));
  console.log('keys');
  console.log(keys);
  // TODO: mulitpl words and other triggers
  if (value.indexOf('strasse') !== -1) {
    matchesStreets = wordZ.filter((word) => keys.indexOf(word) !== -1 );
  } else if (value.indexOf('straße') !== -1) {
    matchesStreets = wordZ.filter((word) => keysß.indexOf(word) !== -1 );
  }
  return matchesStreets;
};
const getMatchingKeywords = (wordZ, keywords) => {
  return wordZ
      .filter((word) => keywords.indexOf(word) !== -1);
};
// const blackList = ['das', 'ist', 'ein'];
document.addEventListener('DOMContentLoaded', function() {
  loadStreets('geo/streets.json');
  const textarea = document.querySelector('#free-textarea');
  const div = document.getElementById('divId');
  const checklist = document.querySelector('.checklist');
  textarea.addEventListener('input', (event) => {
    const rawValue = (event.target as HTMLTextAreaElement).value;
    checklist.classList.toggle('show-checklist', rawValue.length > 0);
    let value = (event.target as HTMLTextAreaElement).value;
    let highlighted = rawValue;
    const words = value.split(' ');
    value = value.trim().toLowerCase();

    // splitted words
    const wordZ = words.map((word) => word.trim().toLowerCase());
    console.log('wordZ');
    console.log(wordZ);
    const matchesKeywords = getMatchingKeywords(wordZ, keywords);
    const matchesStreets = getMatchingStreets(value, wordZ, SEARCH_INDEX);
    const type = {
      keys: matchesKeywords,
      css: 'highlight--issue',
    };
    highlighted = highlight(rawValue, highlighted, type);
    const type2 = {
      keys: matchesStreets,
      css: 'highlight--street',
    };
    highlighted = highlight(rawValue, highlighted, type2);
    const issueBadges = document.querySelectorAll(`[issue-id]`);
    const issueType = checklist.querySelector('[issue-check="type"]');
    issueType.classList.toggle('svg-success', matchesKeywords.length > 0);
    issueBadges.forEach((issueBadge) => {
      const value = issueBadge.getAttribute('issue-id');
      if (matchesKeywords.indexOf(value) !== -1) {
        // issueBadge.removeClass('hidden');
      } else {
        issueBadge.addClass('hidden');
      }
    });
    const issueTypes = document.querySelectorAll(`[issue-type]`);
    issueTypes.forEach((issueBadge) => {
      const value = issueBadge.getAttribute('issue-type');
      if (matchesStreets.length > 0 && value === 'street') {
        issueBadge.querySelector('[issue-value]').innerHTML = matchesStreets[0];
        // issueBadge.removeClass('hidden');
      } else {
        issueBadge.addClass('hidden');
      }
    });
    const issueLocation = checklist.querySelector('[issue-check="location"]');
    issueLocation.classList.toggle('svg-success', matchesStreets.length > 0);
    div.innerHTML = highlighted;
    (event.target as HTMLTextAreaElement).value = rawValue;
  });
});
