import { call } from 'redux-saga/effects';
import { payWithTerminalEuroset, createPaymentResource } from './pay-with-terminal-euroset';
import { makePayment } from './make-payment';

it('payWithTerminalEuroset', () => {
    const endpoint = 'http://test.endpoint';
    const c = {
        appConfig: {
            capiEndpoint: endpoint
        }
    } as any;
    const m = 'ModelStateMock' as any;
    const a = 'AmountInfoStateMock' as any;
    const v = 'PayableFormValuesMock' as any;
    const fn = createPaymentResource(c.appConfig.capiEndpoint);
    
    const iterator = payWithTerminalEuroset(c, m, a, v);
    const actual = iterator.next().value;
    const expected = call(makePayment, c, m, v, a, fn);
    expect(actual.toString()).toEqual(expected.toString());
});
