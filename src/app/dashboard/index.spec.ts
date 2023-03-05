import {highlight} from './index';


describe('test highlight()', () => {
  const type = {
    keys: ['wilhelmstrasse', 'wilhelmstraße'],
    css: 'highlight--street',
  };
  it('should test basic highlight function', () => {
    const input = 'In der Wilhelmstrasse';
    const output = `In der <span class='${type.css}'>Wilhelmstrasse</span>`;
    let result = input;
    result = highlight(input, result, type);
    expect(result).toBe(output);
  });
  it('should test basic highlight function', () => {
    const testCases = [
      {
        input: 'In der Wilhelmstrasse',
        output: `In der <span class='${type.css}'>Wilhelmstrasse</span>`,
      },
      // {
      //   input: 'In der Wilhelmstraße',
      //   output: `In der <span class='${type.css}'>Wilhelmstraße</span>`,
      // },
      {
        input: 'In der WilHelmstrasse',
        output: `In der <span class='${type.css}'>WilHelmstrasse</span>`,
      },
    ];
    testCases.forEach((issue) => {
      let result = issue.input;
      result = highlight(issue.input, result, type);
      expect(result).toEqual(issue.output);
    });
  });
});
// TODO: mulitple input cahnges

// TODO: ß ae, ou
// TODO: multili input
