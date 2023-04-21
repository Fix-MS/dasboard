import {fetchData} from './fetchData';
import {SEARCH_INDEX} from './../types';

const SEARCH_INDEX: SEARCH_INDEX = {
  streets: {
    optimized: [], raw: [],
  },
  services: {
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

const loadSearchIndex = (streets: Array<string>) => {
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

export const loadStreets = (url: string) => {
  fetchData(url, (data) => {
    SEARCH_INDEX['streets'] = loadSearchIndex(data.streets);
  });
};
export const loadServices = (url: string) => {
  fetchData(url, (data) => {
    const services = [];
    data.forEach((element) => {
      services.push(element['service_name']);
    });
    // TODO: clean services
    SEARCH_INDEX['services'] = loadSearchIndex(services);
  });
};
export const getStreets = () => {
  return SEARCH_INDEX['streets'].optimized; // TODO: caching
};
export const getServices = () => {
  return SEARCH_INDEX['services'].optimized; // TODO: caching
};
