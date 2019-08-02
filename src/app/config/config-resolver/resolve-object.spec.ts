import { resolveObject } from './resolve-object';
import { getMessageInvalidValue } from 'checkout/log-messages';

jest.mock('../../log-messages');
const getMessageInvalidValueMock = getMessageInvalidValue as any;
const spy = jest.spyOn(global.console, 'warn');

it('wrong param value should return null', () => {
    spy.mockReset();
    const actual = resolveObject(null, 'someField');
    expect(actual).toEqual(null);
});

it('wrong param value should log warn message', () => {
    spy.mockReset();
    const logMock = 'some log';
    getMessageInvalidValueMock.mockReturnValueOnce(logMock);
    const actual = resolveObject([], 'someField');
    expect(spy.mock.calls[0][0]).toEqual(logMock);
    expect(actual).toEqual(null);
});

it('string should log warn message', () => {
    spy.mockReset();
    const logMock = 'some log';
    getMessageInvalidValueMock.mockReturnValueOnce(logMock);
    const actual = resolveObject(' string ', 'someField');
    expect(spy.mock.calls[0][0]).toEqual(logMock);
    expect(actual).toEqual(null);
});

it('stringify array should log warn message', () => {
    spy.mockReset();
    const logMock = 'some log';
    getMessageInvalidValueMock.mockReturnValueOnce(logMock);
    const actual = resolveObject('[]', 'someField');
    expect(spy.mock.calls[0][0]).toEqual(logMock);
    expect(actual).toEqual(null);
});

it('object param should return object', () => {
    const obj = { metadata: 'test' };
    const actual = resolveObject({ ...obj }, 'someField');
    expect(actual).toEqual(obj);
});

it('stringify object param should return object', () => {
    const obj = { metadata: 'test' };
    const actual = resolveObject(JSON.stringify(obj), 'someField');
    expect(actual).toEqual(obj);
});
