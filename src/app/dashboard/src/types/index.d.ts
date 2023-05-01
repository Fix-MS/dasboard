import {APIS} from './../config';
export type streetKEYS = `${string.toLowerCase}`;
export type LOWER_CASE = `${string.toLowerCase}`;
export type TYPE = keyof typeof APIS; // 'location' | 'type'

export type MATCHES = Array<_MATCH>;
export type _MATCH = {
    key: string;
    startMatched: number;
    startCleaned: number;
    lengthMatched: number;
    lengthCleaned: number;
    index: number;
    cleaned: string;
    matched: string;
};
export type STREETS = {
    raw: Array<string>;
    optimized: Array<`${string.toLowerCase}`>;
}
export type SEARCH_DATA = {
    raw: Array<string>;
    optimized: Array<`${string.toLowerCase}`>;
}
export type SEARCH_INDEX = { // TODO: generalize
    [key: TYPE]: SEARCH_DATA;
};
export type HIGHLIGHT = {
    keys: Array<string>;
    css: string;
}
export type TYPE_HIGHLIGHT = {
    matches: Array<_MATCH>;
    css: string;
}
export type RESULT = {
    type: string;
    list: Array<any>
}
export type HTMLElements = NodeListOf<Element>;

export type TYPES = Array<TYPE>;
export interface MATCHED {
    [key: TYPE]: Array<any>
}
export type DB = {
    [key: TYPE]: SEARCH_DATA;
};
