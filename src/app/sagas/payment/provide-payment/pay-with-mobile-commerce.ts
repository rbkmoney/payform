import { call, CallEffect, put, PutEffect } from 'redux-saga/effects';
import {
    AmountInfoState,
    ModelState,
    MobileCommerceFormValues,
    ModalInfo
} from 'checkout/state';
import { Config } from 'checkout/config';
import { createMobileCommerce } from '../../create-payment-resource';
import { makePayment } from './make-payment';
import { SetModalState, TypeKeys } from 'checkout/actions';
import { ModalInfoType } from 'checkout/state/modal/modal-info';

const createPaymentResource = (endpoint: string, formValues: MobileCommerceFormValues) =>
    createMobileCommerce.bind(null, endpoint, formValues);

export function* payWithMobileCommerce(
    c: Config,
    m: ModelState,
    a: AmountInfoState,
    v: MobileCommerceFormValues
): Iterator<CallEffect> | PutEffect<SetModalState> {
    const fn = createPaymentResource(c.appConfig.capiEndpoint, v);
    yield put<SetModalState>({
        type: TypeKeys.SET_MODAL_STATE,
        payload: new ModalInfo(
            ModalInfoType.MobileCommerce,
            true
        )
    });
    yield call(makePayment, c, m, v, a, fn);
}
