import { call } from 'redux-saga/effects';
import { createPayment, toPaymentFlow } from './create-payment';
import { createPayment as request, FlowType, PayerType, HoldExpirationType} from 'checkout/backend';

it('createPayment', () => {
    const endpoint = 'http://test.endpoint' as any;
    const token = 'tokenMock' as any; 
    const invoiceID = 'invoiceIDMock' as any;
    const formEmail = 'formEmailMock' as any;
    const initConfig = {amount: 'amountMock'} as any;
    const paymentToolToken = 'paymentToolTokenMock' as any;
    const paymentSession = 'paymentSessionMock' as any;
    const resource = {paymentToolToken, paymentSession} as any;
    const email = initConfig.email || formEmail;
    const params = {
        flow: { type: FlowType.PaymentFlowInstant },
        payer: {
            payerType: PayerType.PaymentResourcePayer,
            paymentToolToken,
            paymentSession,
            contactInfo: {
                email
            }
        },
        makeRecurrent: initConfig.recurring,
        metadata: initConfig.metadata
    };
    const iterator = createPayment(endpoint, token, invoiceID, formEmail, resource, initConfig);
    const actual = iterator.next().value;
    
    const expected = call(request, endpoint, token, invoiceID, params);
    expect(actual).toEqual(expected);
});

it('should get hold from toPaymentFlow', () => {
    const initConfig = {paymentFlowHold: true, holdExpiration: HoldExpirationType.capture} as any;
    const actual = toPaymentFlow(initConfig);
    
    expect(actual).toEqual({type: FlowType.PaymentFlowHold, onHoldExpiration: initConfig.holdExpiration});
});

it('should get instant from toPaymentFlow', () => {
    const initConfig = {paymentFlowHold: false, holdExpiration: HoldExpirationType.capture} as any;
    const actual = toPaymentFlow(initConfig);
    
    expect(actual).toEqual({type: FlowType.PaymentFlowInstant});
});
