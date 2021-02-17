import { logPrefix } from 'checkout/log-messages';
import { call, CallEffect } from 'redux-saga/effects';

const checkout = (payment: YaPay.Payment): Promise<YaPay.ProcessEvent> =>
    new Promise((resolve, reject) => {
        payment.checkout();
        payment.on(YaPay.PaymentEventType.Process, (event) => resolve(event));
        payment.on(YaPay.PaymentEventType.Abort, (event) => reject(event));
        payment.on(YaPay.PaymentEventType.Error, (event) => reject(event));
    });

const handleYaAbortEvent = (e: YaPay.AbortEvent) => {
    if (!e.reason) {
        throw { code: 'error.yandex.pay.event.abort.no.reason' };
    }
    switch (e.reason) {
        case YaPay.AbortEventReason.Close:
            throw { code: 'error.yandex.pay.event.abort.close' };
        case YaPay.AbortEventReason.Timeout:
            throw { code: 'error.yandex.pay.event.abort.timeout' };
        default:
            throw { code: 'error.yandex.pay.event.abort.unknown' };
    }
};

const handleYaErrorEvent = (e: YaPay.ErrorEvent) => {
    if (!e.reason) {
        throw { code: 'error.yandex.pay.event.error.no.reason' };
    }
    switch (e.reason) {
        // TODO need flexible error handling
        case YaPay.ErrorEventReason.AmountLimitExceeded:
        case YaPay.ErrorEventReason.CardNetworkNotSupported:
        case YaPay.ErrorEventReason.CardNotFound:
        case YaPay.ErrorEventReason.CodeCheckFailed:
        case YaPay.ErrorEventReason.GatewayNotFound:
        case YaPay.ErrorEventReason.InsecureMerchantDomain:
        case YaPay.ErrorEventReason.InvalidAmount:
        case YaPay.ErrorEventReason.InvalidCountry:
        case YaPay.ErrorEventReason.InvalidCurrency:
        case YaPay.ErrorEventReason.InvalidVersion:
        case YaPay.ErrorEventReason.MerchantDomainError:
        case YaPay.ErrorEventReason.MerchantNotFound:
            throw { code: `error.yandex.pay.event.error.${e.reason}` };
        default:
            throw { code: 'error.yandex.pay.event.error.unknown' };
    }
};

const handleYaCheckoutErrors = (e: YaPay.AbortEvent | YaPay.ErrorEvent | any) => {
    if (e && e.type) {
        switch (e.type) {
            case YaPay.PaymentEventType.Abort:
                return handleYaAbortEvent(e);
            case YaPay.PaymentEventType.Error:
                return handleYaErrorEvent(e);
            default:
                console.error(`${logPrefix} Unhandled PaymentsClient statusCode`, e);
                throw { code: 'error.yandex.pay.unknown' };
        }
    }
};

export function* processYaCheckout(yaPayment: YaPay.Payment): Iterator<CallEffect | YaPay.ProcessEvent> {
    try {
        return yield call(checkout, yaPayment);
    } catch (e) {
        yield call(handleYaCheckoutErrors, e);
    }
}
