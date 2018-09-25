// str = 'aa?bb?cc'
// str.split('?', 2) => ['aa', 'bb']
// splitByFirst(str, '?') => ['aa', 'bb?cc']
export const splitByFirst = (str: string, sep: string): [string] | [string, string] => {
    const firstSepIdx = str.indexOf(sep);
    return firstSepIdx === -1 ? [str] : [str.slice(0, firstSepIdx), str.slice(firstSepIdx + 1)];
};
