import { call, put } from 'redux-saga/effects';
import {
    AmountInfoState,
    ModelState,
    MobileCommerceFormValues,
    ModalForms,
    MobileCommerceReceiptFormInfo
} from 'checkout/state';
import { Config } from 'checkout/config';
import { createMobileCommerce } from '../../create-payment-resource';
import { makePayment } from './make-payment';
import { TypeKeys } from '../../../actions';

const createPaymentResource = (endpoint: string, formValues: MobileCommerceFormValues) =>
    createMobileCommerce.bind(null, endpoint, formValues);

export function* payWithMobileCommerce(c: Config, m: ModelState, a: AmountInfoState, v: MobileCommerceFormValues) {
    const fn = createPaymentResource(c.appConfig.capiEndpoint, v);
    yield call(makePayment, c, m, v, a, fn, false);
    yield put({
        type: TypeKeys.SET_MODAL_STATE,
        payload: new ModalForms([new MobileCommerceReceiptFormInfo()], true)
    });
}
