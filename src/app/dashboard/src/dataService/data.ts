import {fetchData} from './fetchData';
import {SEARCH_INDEX, TYPE} from './../types';
import {APIS} from '../config';

const SEARCH_INDEX: SEARCH_INDEX = {
  location: {
    optimized: [], raw: [],
  },
  type: {
    optimized: [], raw: [],
  },
};
// const db = { // TODO: new structure
//   'keywords': {
//     'schlagloch': {},
//     'glasbruch': {},
//     'verschmutzung': {synonyms: 'verschmutzt'},
//   },
//   'streets': {
//     'wilhelmstrasse': {},
//     'teststrasse': {},
//   },
// };

const loadSearchIndex = (type: TYPE, raw: any) => {
  const data: Array<string> = [];
  let streets: any;
  switch (type) {
    case 'type':
      raw.forEach((element) => {
        data.push(element['service_name']);
      });
      streets = data;

      break;
    case 'location':
      streets = raw.streets;
      break;
  }
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


export const loadData = async (type: TYPE) => {
  const url = APIS[type];
  fetchData(url, (data) => {
    SEARCH_INDEX[type] = loadSearchIndex(type, data);
  });
};

export const getData = (type: TYPE) => {
  return SEARCH_INDEX[type].optimized; // TODO: caching
};
