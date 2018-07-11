import { logUnavailableResult } from './log-unavailable-result';
import { UnavailableReason } from 'checkout/sagas/log-unavailable-result/check-result';

describe('Result available truthy', () => {
    const params = {available: true};

    it('should undefined', () => {
        const spy = jest.spyOn(global.console, 'warn');
        logUnavailableResult('', params);
        expect(spy).not.toBeCalled();
    });
});

describe('Result available falsy', () => {
    const params = {available: false};

    it('should undefined', () => {
        const spy = jest.spyOn(global.console, 'warn');
        logUnavailableResult('', params);
        expect(spy.mock.calls[0][0]).toEqual(undefined);
        spy.mockRestore();
    });

    it('should contain param and message', () => {
        const spy = jest.spyOn(global.console, 'warn');
        logUnavailableResult('testParam', {...params, reason: UnavailableReason.capability, message: 'Test message.'});
        expect(spy.mock.calls[0][0]).toMatch('testParam');
        expect(spy.mock.calls[0][0]).toMatch('Test message.');
        spy.mockRestore();
    });
});
