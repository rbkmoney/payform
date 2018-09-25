import { getUrlParams } from './get-url-params';

it('URL with some params', () => {
    const url = 'http://test.ru/test/a/b?a=a&b=1&c=!@+';
    const actual = getUrlParams(url);
    expect(actual).toEqual({ a: 'a', b: '1', c: '!@+' });
});

it('URL with "="', () => {
    const url = 'https://securepay.rsb.ru/ecomm2/ClientHandler?trans_id=T8I5I3tsYybTpYEzX++SVLYyWZ8=';
    const actual = getUrlParams(url);
    expect(actual).toEqual({ trans_id: 'T8I5I3tsYybTpYEzX++SVLYyWZ8=' });
});

it('Russian params need decode', () => {
    const url = 'https://%D1%80%D0%BE%D1%81%D1%81%D0%B8%D1%8F.%D1%80%D1%84/%D1%82%D0%B5%D1%81%D1%82?%D1%8F=%D1%8F';
    const actual = getUrlParams(url);
    expect(actual).toEqual({ я: 'я' });
});

it('Param with space', () => {
    const url = 'http://test.ru/test?a a a=aaa';
    const actual = getUrlParams(url);
    expect(actual).toEqual({ 'a a a': 'aaa' });
});

it('Empty params', () => {
    const url = 'http://test.ru/test';
    const actual = getUrlParams(url);
    expect(actual).toEqual({});
});
