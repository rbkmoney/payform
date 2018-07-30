import { Config } from 'checkout/config';
import { AmountInfoState, ModalInteraction, ModelState, TokenProviderFormValues } from 'checkout/state';
import { call, put } from 'redux-saga/effects';
import { TypeKeys } from 'checkout/actions';
import { RequestType, Transaction } from 'checkout/backend';
import { serialize } from '../../../../../initializer/popup-initializer';
import { listen } from 'cross-origin-communicator';
import {
    communicatorInstanceName,
    Event,
    ResultData,
    Type,
    URIPath
} from '../../../../../constants/samsung-pay-communicator';
import { makePayment } from 'checkout/sagas/payment/provide-payment/make-payment';
import { createSamsungPay, SamsungPayPaymentData } from 'checkout/sagas/create-payment-resource/create-samsung-pay';
import { guid } from 'checkout/utils';
import { detectLocale } from '../../../../../locale/detect-locale';

async function createTransaction(totalAmount: number, currency: string, merchantName: string, serviceID: string, wrapperEndpoint: string): Promise<Transaction> {
    try {
        return await (await fetch(`${wrapperEndpoint}/samsungpay/api/v1/transaction`, {
            method: 'POST',
            body: JSON.stringify({
                callback: '0',
                paymentDetails: {
                    service: {
                        id: serviceID
                    },
                    orderNumber: '123',
                    protocol: {
                        type: '3DS',
                        version: '80'
                    },
                    amount: {
                        currency,
                        total: totalAmount
                    },
                    merchant: {
                        name: merchantName
                    }
                }
            }),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-Request-Id': guid()
            },
            mode: 'cors'
        })).json();
    } catch (e) {
        throw {code: 'error.samsung.pay.not.available'};
    }
}

async function getResultData(transaction: Transaction, serviceId: string, locale: string): Promise<ResultData> {
    let transport = await listen(communicatorInstanceName, 5000);
    return await new Promise<ResultData>((res) => {
        const URL = window.location.origin + URIPath;
        transport.on(Event.CONNECT, async () => {
            transport.emit('connect', {
                transactionId: transaction.id,
                href: transaction.href,
                serviceId,
                callbackURL: URL,
                cancelURL: URL + '?' + serialize({type: Type.ERROR}),
                countryCode: detectLocale(locale),
                publicKeyMod: transaction.encInfo.mod,
                publicKeyExp: transaction.encInfo.exp,
                keyId: transaction.encInfo.keyId
            });
            transport.destroy();
            transport = await listen(communicatorInstanceName);
            transport.on(Event.RESULT, (data: ResultData) => {
                res(data);
            });
        });
    });
}

const createPaymentResource = (endpoint: string, paymentData: SamsungPayPaymentData) =>
    createSamsungPay.bind(null, endpoint, paymentData);

export function* payWithSamsungPay(c: Config, m: ModelState, a: AmountInfoState, v: TokenProviderFormValues): Iterator<any> {
    const transaction = yield createTransaction(a.minorValue / 100, a.currencyCode, c.appConfig.samsungPayMerchantName, c.appConfig.samsungPayServiceID, c.appConfig.wrapperEndpoint);
    yield put({
        type: TypeKeys.SET_MODAL_STATE,
        payload: new ModalInteraction({
            requestType: RequestType.BrowserGetRequest,
            uriTemplate: URIPath
        }, true)
    });
    const resultData: ResultData = yield getResultData(transaction, c.appConfig.samsungPayServiceID, c.initConfig.locale);
    if (resultData.type === Type.SUCCESS) {
        const paymentData = {refId: resultData.refId};
        const fn = createPaymentResource(c.appConfig.capiEndpoint, paymentData);
        return yield call(makePayment, c, m, v, a, fn);
    } else {
        throw {code: resultData.code || 'error.samsung.pay.cancel'};
    }
}
