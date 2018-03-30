import { resolveInteger } from './resolve-integer';
import { getMessageInvalidValue } from 'checkout/log-messages';

jest.mock('../../log-messages');
const getMessageInvalidValueMock = getMessageInvalidValue as any;
const spy = jest.spyOn(global.console, 'warn');

it('wrong param value param should return null', () => {
    spy.mockReset();
    const actual = resolveInteger(null, 'someField');
    expect(actual).toEqual(null);
});

it('wrong param value should log warn message', () => {
    spy.mockReset();
    const logMock = 'some log';
    getMessageInvalidValueMock.mockReturnValueOnce(logMock);
    resolveInteger('wrongValue', 'someField');
    expect(spy.mock.calls[0][0]).toEqual(logMock);
});

it('int param should return 1', () => {
    const actual = resolveInteger(1, 'someField');
    expect(actual).toEqual(1);
});

it('string int param should return 1', () => {
    const actual = resolveInteger('1', 'someField');
    expect(actual).toEqual(1);
});
