import {MATCHES} from './../types';
import {textMatch, encode, decode} from './match';

xdescribe('test helper methods', () => {
  it('should clean() the phrase', () => {
    expect(true).toEqual(true);
  });
  it('should clean() the phrase', () => {
    const input = 'Dörfer sind mäßig unglücklich';
    const result = 'Doerfer sind maessig ungluecklich';
    expect(encode(input)).toEqual(result);
  });
  it('should unclean() the phrase', () => {
    const result = 'Dörfer sind mäßig unglücklich';
    const input = 'Doerfer sind maessig ungluecklich';
    expect(decode(input)).toEqual(result);
  });
});
describe('test textMatch()', () => {
  const DATA = {
    location: ['Beispielstrasse', 'An der Beispielallee'],
  };
  const DATAß = {
    location: ['Beispielstraße', 'An der Beispielallee'],
  };
  it('should match simple word', () => {
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
    expect(textMatch(DATA, 'location', input)).toEqual(result);
  });
  it('should match simple word', () => {
    const input = 'Das ist an der Beispielallee';
    const result: MATCHES = [{
      key: 'An der Beispielallee',
      startMatched: 8,
      lengthMatched: 20,
      startCleaned: 8,
      lengthCleaned: 20,
      index: 1,
      cleaned: 'an der beispielallee',
      matched: 'an der Beispielallee',
    }];
    expect(textMatch(DATA, 'location', input)).toEqual(result);
  });
  it('should match simple word with unexpected case', () => {
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
    expect(textMatch(DATA, 'location', input)).toEqual(result);
  });
  it('should match simple word with ß instead of ss', () => {
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
    expect(textMatch(DATA, 'location', input)).toEqual(result);
  });
  it('should match simple word with ß instead of ss', () => {
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
    expect(textMatch(DATAß, 'location', input)).toEqual(result);
  });
  it('should match simple word with ß instead of ss', () => {
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
    expect(textMatch(DATAß, 'location', input)).toEqual(result);
  });
  it('should match simple word with ß instead of ss (2x specialsChar)', () => {
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
    expect(textMatch(DATA, 'location', input)).toEqual(result);
  });
  it('should match simple word with ß instead of ss (2x specialsChar)', () => {
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
    expect(textMatch(DATAß, 'location', input)).toEqual(result);
  });
  it('should match nothing when nothing detected', () => {
    const input = 'Däs ist die Handjerystrasse';
    const result: MATCHES = [];
    expect(textMatch(DATAß, 'location', input)).toEqual(result);
  });

  // TODO: am schlossgarten vs. schlossgarten
});
