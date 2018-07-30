import { Config } from 'checkout/config';
import { AmountInfoState, ModalInteraction, ModelState, TokenProviderFormValues } from 'checkout/state';
import { call, put, PutEffect } from 'redux-saga/effects';
import { TypeKeys } from 'checkout/actions';
import { RequestType, Transaction } from 'checkout/backend';
import {
    ResultData,
    Type,
    URIPath
} from '../../../../../constants/samsung-pay-communicator';
import { makePayment } from 'checkout/sagas/payment/provide-payment/make-payment';
import { createSamsungPay } from 'checkout/sagas/create-payment-resource/create-samsung-pay';
import { createTransaction } from './create-transaction';
import { getResultData } from './get-result-data';
import { ProvidePaymentEffects } from 'checkout/sagas/payment/provide-payment/provide-payment';
import { SetModalState } from 'checkout/actions/modal-actions/set-modal-state';

const createPaymentResource = (endpoint: string, referenceID: string, serviceID: string) =>
    createSamsungPay.bind(null, endpoint, referenceID, serviceID);

export function* payWithSamsungPay(c: Config, m: ModelState, a: AmountInfoState, v: TokenProviderFormValues): Iterator<Promise<Transaction> | PutEffect<SetModalState> | Promise<ResultData> | ProvidePaymentEffects> {
    const transaction = yield createTransaction(a.minorValue / 100, a.currencyCode, c.appConfig.samsungPayMerchantName, c.appConfig.samsungPayServiceID, c.appConfig.wrapperEndpoint);
    yield put<SetModalState>({
        type: TypeKeys.SET_MODAL_STATE,
        payload: new ModalInteraction({
            requestType: RequestType.BrowserGetRequest,
            uriTemplate: URIPath
        }, true)
    });
    const resultData: ResultData = yield getResultData(transaction, c.appConfig.samsungPayServiceID, c.initConfig.locale);
    if (resultData.type === Type.SUCCESS) {
        const fn = createPaymentResource(c.appConfig.capiEndpoint, resultData.refId, c.appConfig.samsungPayServiceID);
        return yield call(makePayment, c, m, v, a, fn);
    } else {
        throw {code: resultData.code || 'error.samsung.pay.cancel'};
    }
}
