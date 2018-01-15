import { SetFormInfo, TypeKeys } from 'checkout/actions';
import { ResultFormInfo, ResultType } from 'checkout/state';

export const setErrorFormInfo = (): SetFormInfo => ({
    type: TypeKeys.SET_FORM_INFO,
    payload: new ResultFormInfo(ResultType.error, true)
});
