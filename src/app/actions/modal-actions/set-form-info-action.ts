import {FormName, ModelState} from 'checkout/state';
import {InitConfig} from 'checkout/config';
import {SetFormInfo} from './set-form-info';
import {TypeKeys} from 'checkout/actions';
import {toCardFormInfo, toPaymentMethods} from 'checkout/actions/modal-actions/converters';

export const setFormInfo = (formName: FormName, initConfig: InitConfig, model: ModelState): SetFormInfo => {
    let payload;

    switch (formName) {
        case FormName.cardForm:
            payload = toCardFormInfo(initConfig, model.invoiceTemplate);
            break;
        case FormName.paymentMethods:
            payload = toPaymentMethods();
            break;
    }

    return {
        type: TypeKeys.SET_FORM_INFO,
        payload
    };
};
