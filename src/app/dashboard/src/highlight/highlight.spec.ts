import {highlight, updateChecklist} from './highlight';
import {enableFetchMocks} from 'jest-fetch-mock';
import {TYPE_HIGHLIGHT} from '../types';
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
