import {MATCHED} from './../types/index.d';
import {
  highlight, showBadges, updateChecklist, updateHighlight,
} from './highlight';
import {TYPE_HIGHLIGHT} from '../types';
import {Badge} from '../badge/badge';
import {enableFetchMocks} from 'jest-fetch-mock';
enableFetchMocks();

describe('test showCheck', () => {
  beforeEach(() => {
    const html = `
    <section class="checklist">
      <ul>
        <li issue-check="type">
        <svg-icon name="success-icon" size="24"></svg-icon>
        <span>Vorfall-Typ</span>
      </li>
      <li issue-check="location">
        <svg-icon name="success-icon" size="24"></svg-icon>
        <span>Ort</span>
      </li>
      </ul>
    </section>`;
    document.documentElement.innerHTML = html.toString();
  });

  afterEach(() => {
    jest.resetModules();
    document.documentElement.innerHTML = '';
  });

  it('it should show svg-success if list is not empty', () => {
    const checklist = document.querySelector('.checklist');
    const matched = {
      'type': [],
      'location': [1, 2, 3],
    };
    updateChecklist(checklist, matched);
    const issue = checklist.querySelector(`[issue-check="location"] svg-icon`);
    expect(issue.classList.contains('success')).toBe(true);
    const issueType = checklist.querySelector(`[issue-check="type"] svg-icon`);
    expect(issueType.classList.contains('success')).toBe(false);
  });
});
describe('test showBadges()', () => {
  const MATCHED: MATCHED = { // TODO: create mock.ts generator for streets
    location: [{
      cleaned: 'beispielstrasse',
      index: 40,
      key: 'beispielstrasse',
      lengthCleaned: 10,
      lengthMatched: 10,
      matched: 'beispielstrasse',
      startCleaned: 16,
      startMatched: 16,
    }],
    types: [],
  };
  beforeEach(() => {
    const html = `
    <div id="badges"></div>
    `;
    document.documentElement.innerHTML = html.toString();
  });

  afterEach(() => {
    jest.resetModules();
    document.documentElement.innerHTML = '';
  });
  customElements.define('badge-element', Badge);
  it('should display a simple badge for services', () => {
    const MATCHED_EMPTY: MATCHED = {types: [], location: []};
    showBadges(MATCHED_EMPTY);
    const badges = document.querySelectorAll('#badges badge-element');
    expect(badges.length).toEqual(0);
  });
  it('should display a simple badge for services', () => {
    showBadges(MATCHED);
    const badges = document.querySelectorAll('#badges badge-element');
    expect(badges.length).toEqual(1);
    showBadges(MATCHED); // re-add: dom node exists
    const badges2 = document.querySelectorAll('#badges badge-element');
    expect(badges2.length).toEqual(1);
  });
  it('should display a simple badge for services', () => {
    const MATCHED2: MATCHED = {
      location: [{
        cleaned: 'teststrasse',
        index: 40,
        key: 'teststrasse',
        lengthCleaned: 10,
        lengthMatched: 10,
        startCleaned: 16,
        startMatched: 16,
      }],
      types: [],
    };
    showBadges(MATCHED);
    const badges = document.querySelectorAll('#badges badge-element');
    expect(badges.length).toEqual(1);
    showBadges(MATCHED2);
    const badges2 = document.querySelectorAll('#badges badge-element');
    expect(badges2.length).toEqual(2);
  });
});
describe('test updateHighlight()', () => {
  it('should test basic updateHighlight function', () => {
    const DATA = {
      location: ['Neustrasse'],
    };
    const type = 'location';
    const rawValue = 'In die Neustrasse';
    const highlighted = 'In die Neustrasse';
    const result = updateHighlight(DATA, type, rawValue, highlighted);
    expect(result).toEqual({
      highlighted: `In die <span class='highlight--${type}'>Neustrasse</span>`,
      matched: [
        {
          'cleaned': 'neustrasse',
          'index': 0,
          'key': 'Neustrasse',
          'lengthCleaned': 10,
          'lengthMatched': 10,
          'matched': 'Neustrasse',
          'startCleaned': 7,
          'startMatched': 7,
        },
      ],
    });
  });
});
describe('test highlight()', () => {
  const type: TYPE_HIGHLIGHT = {
    matches: [{
      key: 'Wilhelmstrasse',
      startMatched: 7,
      lengthMatched: 14,
      startCleaned: 7,
      lengthCleaned: 14,
      index: 0,
      cleaned: 'wilhelmstrasse',
      matched: 'Wilhelmstrasse',
    }],
    css: 'highlight--street',
  };
  it('should test basic highlight function', () => {
    // fetchMock.doMock();
    const STREETS_MOCK = {
      streets: ['wilhelmstrasse', 'wilhelmstraße'],
    };
    fetchMock.mockResponseOnce(JSON.stringify(STREETS_MOCK));
    const input = 'In der Wilhelmstrasse';
    const output = `In der <span class='${type.css}'>Wilhelmstrasse</span>`;
    let result = input;
    result = highlight(result, type);
    expect(result).toBe(output);
  });
  it('should test basic highlight function', () => {
    const STREETS_MOCK = {
      streets: ['wilhelmstrasse', 'wilhelmstraße'],
    };
    fetchMock.mockResponseOnce(JSON.stringify(STREETS_MOCK));
    const testCases = [
      {
        matched: 'Wilhelmstrasse',
        input: 'In der Wilhelmstrasse',
        output: `In der <span class='${type.css}'>Wilhelmstrasse</span>`,
      },
      // {
      //   input: 'In der Wilhelmstraße',
      //   output: `In der <span class='${type.css}'>Wilhelmstraße</span>`,
      // },
      {
        matched: 'WilHelmstrasse',
        input: 'In der WilHelmstrasse',
        output: `In der <span class='${type.css}'>WilHelmstrasse</span>`,
      },
    ];
    testCases.forEach((issue) => {
      const type = {
        matches: [{
          key: 'Wilhelmstrasse',
          startMatched: 7,
          lengthMatched: 14,
          startCleaned: 7,
          lengthCleaned: 14,
          index: 0,
          cleaned: 'wilhelmstrasse',
          matched: issue.matched,
        }],
        css: 'highlight--street',
      };
      let result = issue.input;
      result = highlight(result, type);
      expect(result).toEqual(issue.output);
    });
  });
});


// TODO: mulitple input cahnges

// TODO: ß ae, ou
// TODO: multili input
