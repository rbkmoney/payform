import {FormInfo, FormName, ModelState, ResultFormInfo, ResultType} from 'checkout/state';
import {InitConfig} from 'checkout/config';
import {SetFormInfo} from './set-form-info';
import {TypeKeys} from 'checkout/actions';
import {toCardFormInfo, toPaymentMethods} from 'checkout/actions/modal-actions/converters';

const toPayload = (formName: FormName, initConfig: InitConfig, model: ModelState): FormInfo => {
    switch (formName) {
        case FormName.cardForm:
            return toCardFormInfo(initConfig, model.invoiceTemplate);
        case FormName.paymentMethods:
            return toPaymentMethods();
        default:
            return new ResultFormInfo(ResultType.error, true);
    }
};

export const setFormInfo = (formName: FormName, initConfig: InitConfig, model: ModelState): SetFormInfo  => {
    return {
        type: TypeKeys.SET_FORM_INFO,
        payload: toPayload(formName, initConfig, model)
    };
};
