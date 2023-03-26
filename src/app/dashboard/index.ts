import {SEARCH_INDEX, TYPE_HIGHLIGHT} from './../../index.d';
// import {CONFIG} from './config';
import {overwriteElementPrototypes} from './src/dom/dom';
import {textMatch} from './src/match/match';
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
const showCheck = (target: Element, targetList: Array<any>, type: string) => {
  const issueLocation = target.querySelector(`[issue-check="${type}"]`);
  issueLocation.classList.toggle('svg-success', targetList.length > 0);
};

// const issueType = checklist.querySelector('[issue-check="type"]');
// issueType.classList.toggle('svg-success', matchesKeywords.length > 0);

const KEYWORDS = Object.keys(db.keywords);
const SEARCH_INDEX: SEARCH_INDEX = {
  streets: {
    optimized: [], raw: [],
  },
};
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
  // const headers = new Headers({
  //   'Accept': 'application/json', // set Accept header to application/json
  // });
  // fetch(url, {headers})
  fetch(url)
      .then(function(res) {
        if (res.ok) {
          const contentType = res.headers.get('content-type');
          switch (contentType) {
            case 'application/json; charset=UTF-8':
              return res.json(); break;
            case 'text/plain;charset=UTF-8':
              return res.text(); break;
          }
        }
      })
      .then(function(data) {
        let result;
        try {
          if (typeof data === 'string') {
            result = JSON.parse(data);
          } else {
            result = data;
          }
        } catch (e) {
          console.log(e);
        }
        // console.log(result);
        SEARCH_INDEX['streets'] = loadStreetSearchIndex(result.streets);
      });
};
const getStreets = () => {
  return SEARCH_INDEX['streets'].optimized; // TODO: caching
};
export const highlightNew = (newStr, type) => {
  const matches = type.matches;
  const css = type.css;
  matches.forEach((_match) => {
    const raw = _match.matched;
    newStr = newStr.replace(raw, `<span class='${css}'>${raw}</span>`);
  });
  return newStr;
};

// const blackList = ['das', 'ist', 'ein']; // IDEA
document.addEventListener('DOMContentLoaded', function() {
  loadStreets('geo/streets.json');
  const textarea = document.querySelector('#free-textarea');
  const div = document.getElementById('divId');
  const checklist = document.querySelector('.checklist');
  textarea.addEventListener('input', (event: InputEvent) => {
    const STREETS = getStreets();

    const rawValue = (event.target as HTMLTextAreaElement).value;
    checklist.classList.toggle('show-checklist', rawValue.length > 0);
    let highlighted = rawValue;

    const MATCHED_KEYWORDS = textMatch(KEYWORDS, rawValue);
    const type: TYPE_HIGHLIGHT = {
      matches: MATCHED_KEYWORDS,
      css: 'highlight--issue',
    };
    highlighted = highlightNew(highlighted, type);

    const MATCHED_STREETS = textMatch(STREETS, rawValue);
    const type2: TYPE_HIGHLIGHT = {
      matches: MATCHED_STREETS,
      css: 'highlight--street',
    };
    highlighted = highlightNew(highlighted, type2);

    showCheck(checklist, MATCHED_KEYWORDS, 'type');
    showCheck(checklist, MATCHED_STREETS, 'location');
    const issueTypes = document.querySelectorAll(`[issue-type]`);
    issueTypes.forEach((issueBadge) => {
      const value = issueBadge.getAttribute('issue-type');
      if (MATCHED_STREETS.length > 0 && value === 'street') {
        const issue = issueBadge.querySelector('[issue-value]');
        issue.innerHTML = MATCHED_STREETS[0].matched;
        issueBadge.removeClass('hidden');
      } else {
        issueBadge.addClass('hidden');
      }
    });
    div.innerHTML = highlighted;
    (event.target as HTMLTextAreaElement).value = rawValue;
  });
});
