import { resolveString } from './resolve-string';
import { getMessageInvalidValue } from 'checkout/log-messages';

jest.mock('../../log-messages');
const getMessageInvalidValueMock = getMessageInvalidValue as any;
const spy = jest.spyOn(global.console, 'warn');

it('wrong param value should return null', () => {
    spy.mockReset();
    const actual = resolveString(null, 'someField');
    expect(actual).toEqual(null);
});

it('wrong param value should log warn message', () => {
    spy.mockReset();
    const logMock = 'some log';
    getMessageInvalidValueMock.mockReturnValueOnce(logMock);
    resolveString(999, 'someField');
    expect(spy.mock.calls[0][0]).toEqual(logMock);
});

it('empty string should log warn message', () => {
    spy.mockReset();
    const logMock = 'some log';
    getMessageInvalidValueMock.mockReturnValueOnce(logMock);
    resolveString(' ', 'someField');
    expect(spy.mock.calls[0][0]).toEqual(logMock);
});

it('string param should return trimmed string', () => {
    const actual = resolveString(' some value ', 'someField');
    expect(actual).toEqual('some value');
});
