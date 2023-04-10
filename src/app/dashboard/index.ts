import {SEARCH_INDEX, TYPE_HIGHLIGHT, MATCHED} from './src/types';
import {overwriteElementPrototypes} from './src/dom/dom';
import {textMatch} from './src/match/match';
import {highlight, updateChecklist} from './src/highlight/highlight';
import {SvgIcon} from './src/svgIcon/svgIcon';
import { Badge } from './src/badge/badge';


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
    optimized,
  };
};
const loadStreets = (url: string) => {
  fetch(url)
      .then((res) => {
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
      .then((data) => {
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
        SEARCH_INDEX['streets'] = loadStreetSearchIndex(result.streets);
      });
};
const loadServices = (url: string) => {
  fetch(url)
      .then((res) => {
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
      .then((data) => {
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
        const services = [];
        result.forEach((element) => {
          services.push(element['service_name']);
        });
        // TODO: clean services
        SEARCH_INDEX['services'] = loadStreetSearchIndex(services);
      });
};
const getStreets = () => {
  return SEARCH_INDEX['streets'].optimized; // TODO: caching
};
const getServices = () => {
  return SEARCH_INDEX['services'].optimized; // TODO: caching
};
customElements.define('svg-icon', SvgIcon);
customElements.define('badge-element', Badge);

// const blackList = ['das', 'ist', 'ein']; // IDEA
document.addEventListener('DOMContentLoaded', () => {
  loadStreets('geo/streets.json');
  loadServices('geo/services.json');
  const textarea = document.querySelector('#free-textarea');
  const div = document.getElementById('divId');
  const checklist = document.querySelector('.checklist');
  textarea.addEventListener('input', (event: InputEvent) => {
    const STREETS = getStreets();
    let SERVICES = getServices();
    SERVICES = [...SERVICES, ...KEYWORDS];

    const rawValue = (event.target as HTMLTextAreaElement).value;
    checklist.classList.toggle('show-checklist', rawValue.length > 0);
    let highlighted = rawValue;
    const MATCHED: MATCHED = {
      'type': [],
      'location': [],
    };

    MATCHED['type'] = textMatch(SERVICES, rawValue);
    // MATCHED['type'] = textMatch(KEYWORDS, rawValue);
    const type: TYPE_HIGHLIGHT = {
      matches: MATCHED['type'],
      css: 'highlight--issue',
    };
    // console.log(MATCHED);
    highlighted = highlight(highlighted, type);

    MATCHED['location'] = textMatch(STREETS, rawValue);
    const type2: TYPE_HIGHLIGHT = {
      matches: MATCHED['location'],
      css: 'highlight--street',
    };
    highlighted = highlight(highlighted, type2);

    const issueTypes = document.querySelectorAll('[issue-type]');
    const badgeContainer = document.querySelector('#badges');
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
    // issueTypes.forEach((issueBadge) => {
    //   const type = issueBadge.getAttribute('issue-type');
    //   if (MATCHED['location'].length > 0 && type === 'location') {
    //     const issue = issueBadge.querySelector('[issue-value]');
    //     issue.innerHTML = MATCHED['location'][0].matched;
    //     issueBadge.removeClass('hidden');
    //     // const issue2 = badges.querySelector('badge-element[type="location"]');
    //     // issue2.setAttribute('label', MATCHED['location'][0].matched);
    //     // issue2.addClass('visible');
    //   } else {
    //     issueBadge.addClass('hidden');
    //   }
    // });
    updateChecklist(checklist, MATCHED);
    div.innerHTML = highlighted;
    (event.target as HTMLTextAreaElement).value = rawValue;
  });
});
