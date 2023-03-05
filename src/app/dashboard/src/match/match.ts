import {MATCHES} from 'index.d';

const MAP = {
  'ä': 'ae',
  'ö': 'oe',
  'ü': 'ue',
  'ß': 'ss',
};


const _flip = (map) => {
  const newMap = {};
  const keys = Object.keys(map);
  keys.forEach((key) => {
    newMap[map[key]] = key;
  });
  return newMap;
};
const _replace = (phrase: string, direction = true) => {
  let newPhrase = phrase;
  const map = direction ? MAP : _flip(MAP);
  const keys = Object.keys(map);
  keys.forEach((key) => {
    const regex = new RegExp(`${key}`, 'ig');
    newPhrase = newPhrase.replace(regex, map[key]);
  });
  return newPhrase;
};
export const clean = (phrase: string): string => {
  return _replace(phrase, true);
};
export const unClean = (phrase: string): string => {
  return _replace(phrase, false);
};

export const textMatch = (keys: Array<string>, input: string): MATCHES =>{
  const result: MATCHES = [];
  const cleanInput = clean(input.toLowerCase());
  const cleanKeys = keys
      .map((key) => key.toLowerCase()).map((key) => clean(key));
  cleanKeys.forEach((key, index) => {
    if (cleanInput.indexOf(key) !== -1) {
      let start = cleanInput.indexOf(key);
      const len = key.length;
      let matched = input.substring(start, start + len);
      const cleaned = key;
      if (clean(matched) !== cleaned) {
        const changedKey = unClean(key);
        const startNew = input.toLowerCase().indexOf(changedKey);
        if (startNew !== -1) {
          matched = input.substring(startNew, startNew + changedKey.length);
          start = startNew;
        }
      }
      result.push({
        key: keys[index],
        startMatched: start,
        lengthMatched: matched.length,
        startCleaned: cleanInput.indexOf(key),
        lengthCleaned: len,
        index: index,
        cleaned: cleaned,
        matched: matched,
      });
    }
  });
  return result;
};
