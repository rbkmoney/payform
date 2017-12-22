export const isSafetyUrl = (url: string): boolean => /^(http(s)?):\/\/.*$/.test(url);
