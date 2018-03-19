import { resolveBoolean } from './resolve-boolean';
import { getMessageInvalidValue } from '../../log-messages';

jest.mock('../../log-messages');
const getMessageInvalidValueMock = getMessageInvalidValue as any;
const logSpy = jest.spyOn(global.console, 'warn');

it('wrong param should return null', () => {
    logSpy.mockReset();
    const actual = resolveBoolean('wrongValue', 'someFiled');
    expect(actual).toEqual(null);
});

it('0 param value should return null', () => {
    logSpy.mockReset();
    const actual = resolveBoolean(0, 'someFiled');
    expect(actual).toEqual(null);
});

it('1 param value should return null', () => {
    logSpy.mockReset();
    const actual = resolveBoolean(1, 'someFiled');
    expect(actual).toEqual(null);
});

it('wrong param should log warn', () => {
    logSpy.mockReset();
    const logMock = 'some log';
    getMessageInvalidValueMock.mockReturnValueOnce(logMock);
    resolveBoolean('wrongValue', 'someFiled');
    expect(logSpy.mock.calls[0][0]).toEqual(logMock);
});

it('false param should not call log warn', () => {
    logSpy.mockReset();
    resolveBoolean(false, 'someFiled');
    expect(logSpy.mock.calls[0]).toBeUndefined();
});

it('boolean true should return true', () => {
    const actual = resolveBoolean(true, 'someFiled');
    expect(actual).toEqual(true);
});

it('string true value should return true', () => {
    const actual = resolveBoolean('true', 'someFiled');
    expect(actual).toEqual(true);
});

it('boolean false should return false', () => {
    const actual = resolveBoolean(false, 'someFiled');
    expect(actual).toEqual(false);
});

it('string false value should return false', () => {
    const actual = resolveBoolean('false', 'someFiled');
    expect(actual).toEqual(false);
});
