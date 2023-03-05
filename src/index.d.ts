export type streetKEYS = `${string.toLowerCase}`;

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
