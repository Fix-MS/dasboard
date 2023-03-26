import {enableFetchMocks} from 'jest-fetch-mock';
enableFetchMocks();
import {highlightNew} from './index';

describe('test highlight()', () => {
  const type = {
    matches: [{
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
    result = highlightNew(result, type);
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
      result = highlightNew(result, type);
      expect(result).toEqual(issue.output);
    });
  });
});
// TODO: mulitple input cahnges

// TODO: ß ae, ou
// TODO: multili input
