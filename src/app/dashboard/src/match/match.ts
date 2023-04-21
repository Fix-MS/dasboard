
import {MATCHES} from './../types';

const MAP = {
  ä: 'ae',
  ö: 'oe',
  ü: 'ue',
  ß: 'ss',
};


const _flip = (map) => {
  const newMap = {};
  const keys = Object.keys(map);
  keys.forEach((key) => {
    newMap[map[key]] = key;
  });
  return newMap;
};
const update = (phrase: string, direction: boolean) => {
  let newPhrase = phrase;
  const map = direction ? MAP : _flip(MAP);
  const keys = Object.keys(map);
  keys.forEach((key) => {
    const regex = new RegExp(`${key}`, 'ig');
    newPhrase = newPhrase.replace(regex, map[key]);
  });
  return newPhrase;
};
/**
 * encode the phrase in transliterated characters
 * @param {string} phrase decoded phrase
 * @return {string} encoded phrase
 */
export const encode = (phrase: string): string => {
  return update(phrase, true);
};
export const decode = (phrase: string): string => {
  return update(phrase, false);
};

export const textMatch = (data, type, input: string): MATCHES =>{
  const keys: Array<string> = data[type];
  const result: MATCHES = [];
  const inputSmall = input.toLowerCase();
  const cleanInput = encode(inputSmall);
  const cleanKeys = keys
      .map((key) => key.toLowerCase()).map((key) => encode(key));
  cleanKeys.forEach((key, index) => {
    if (cleanInput.indexOf(key) !== -1) {
      let start = cleanInput.indexOf(key);
      const len = key.length;
      let matched = input.substring(start, start + len);
      const cleaned = key;
      if (encode(matched) !== cleaned) {
        const changedKey = decode(key);
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
