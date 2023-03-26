export type streetKEYS = `${string.toLowerCase}`;
export type LOWER_CASE = `${string.toLowerCase}`;

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
export type SEARCH_INDEX = {
    streets: STREETS;
};
export type HIGHLIGHT = {
    keys: Array<string>;
    css: string;
}
export type TYPE_HIGHLIGHT = {
    matches: Array<_MATCH>;
    css: string;
}
