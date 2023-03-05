import {MATCHES} from 'index';
import {textMatch, clean, unClean} from './match';


describe('test helper methods', () => {
  it('should clean() the phrase', () => {
    const input = 'Dörfer sind mäßig unglücklich';
    const result = 'Doerfer sind maessig ungluecklich';
    expect(clean(input)).toEqual(result);
  });
  it('should unclean() the phrase', () => {
    const result = 'Dörfer sind mäßig unglücklich';
    const input = 'Doerfer sind maessig ungluecklich';
    expect(unClean(input)).toEqual(result);
  });
});
describe('test textMatch()', () => {
  it('should match simple words', () => {
    const streets = ['Beispielstrasse', 'An der Beispielallee'];
    const input = 'Das ist die Beispielstrasse';
    const result: MATCHES = [{
      key: 'Beispielstrasse',
      startMatched: 12,
      lengthMatched: 15,
      startCleaned: 12,
      lengthCleaned: 15,
      index: 0,
      cleaned: 'beispielstrasse',
      matched: 'Beispielstrasse',
    }];
    expect(textMatch(streets, input)).toEqual(result);
  });
  it('should match simple words with unexpected case', () => {
    const streets = ['Beispielstrasse', 'An der Beispielallee'];
    const input = 'Das ist die BeisPIELstrasse';
    const result: MATCHES = [{
      key: 'Beispielstrasse',
      startMatched: 12,
      lengthMatched: 15,
      startCleaned: 12,
      lengthCleaned: 15,
      index: 0,
      cleaned: 'beispielstrasse',
      matched: 'BeisPIELstrasse',
    }];
    expect(textMatch(streets, input)).toEqual(result);
  });
  it('should match simple words with ß instead of ss', () => {
    const streets = ['Beispielstrasse', 'An der Beispielallee'];
    const input = 'Das ist die Beispielstraße';
    const result: MATCHES = [{
      key: 'Beispielstrasse',
      startMatched: 12,
      lengthMatched: 14,
      startCleaned: 12,
      lengthCleaned: 15,
      index: 0,
      cleaned: 'beispielstrasse',
      matched: 'Beispielstraße',
    }];
    expect(textMatch(streets, input)).toEqual(result);
  });
  it('should match simple words with ß instead of ss', () => {
    const streets = ['Beispielstraße', 'An der Beispielallee'];
    const input = 'Das ist die Beispielstrasse';
    const result: MATCHES = [{
      key: 'Beispielstraße',
      startMatched: 12,
      lengthMatched: 15,
      startCleaned: 12,
      lengthCleaned: 15,
      index: 0,
      cleaned: 'beispielstrasse',
      matched: 'Beispielstrasse',
    }];
    expect(textMatch(streets, input)).toEqual(result);
  });
  it('should match simple words with ß instead of ss', () => {
    const streets = ['Beispielstraße', 'An der Beispielallee'];
    const input = 'Das ist die Beispielstraße';
    const result: MATCHES = [{
      key: 'Beispielstraße',
      startMatched: 12,
      lengthMatched: 14,
      startCleaned: 12,
      lengthCleaned: 15,
      index: 0,
      cleaned: 'beispielstrasse',
      matched: 'Beispielstraße',
    }];
    expect(textMatch(streets, input)).toEqual(result);
  });
  it('should match simple words with ß instead of ss (2x specialsChar)', () => {
    const streets = ['Beispielstrasse', 'An der Beispielallee'];
    const input = 'Däs ist die Beispielstraße'; // 2 special chars
    const result: MATCHES = [{
      key: 'Beispielstrasse',
      startMatched: 12,
      lengthMatched: 14,
      startCleaned: 13,
      lengthCleaned: 15,
      index: 0,
      cleaned: 'beispielstrasse',
      matched: 'Beispielstraße',
    }];
    expect(textMatch(streets, input)).toEqual(result);
  });
  it('should match simple words with ß instead of ss (2x specialsChar)', () => {
    const streets = ['Beispielstraße', 'An der Beispielallee'];
    const input = 'Däs ist die Beispielstraße'; // 2 special chars
    const result: MATCHES = [{
      key: 'Beispielstraße',
      startMatched: 12,
      lengthMatched: 14,
      startCleaned: 13,
      lengthCleaned: 15,
      index: 0,
      cleaned: 'beispielstrasse',
      matched: 'Beispielstraße',
    }];
    expect(textMatch(streets, input)).toEqual(result);
  });
});
