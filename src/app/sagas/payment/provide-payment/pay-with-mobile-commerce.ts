import { call, CallEffect, put, PutEffect } from 'redux-saga/effects';
import { AmountInfoState, ModelState, MobileCommerceFormValues, ModalInfo } from 'checkout/state';
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
        payload: new ModalInfo(ModalInfoType.MobileCommerce, true)
    });
    const cfgMode = new Config();
    cfgMode.origin = c.origin;
    cfgMode.inFrame = c.inFrame;
    cfgMode.initConfig = c.initConfig;
    cfgMode.appConfig = c.appConfig;
    cfgMode.locale = c.locale;
    cfgMode.needToPollEvents = false;
    yield call(makePayment, cfgMode, m, v, a, fn);
}
