import {FormName, SlideDirection} from 'checkout/state';
import {TypeKeys} from 'checkout/actions';
import {NavigateTo} from './navigate-to-form-info';

export const navigateToFormInfo = (formName: FormName, slideDirection: SlideDirection): NavigateTo => {
    return {
        type: TypeKeys.NAVIGATE_TO_FORM_INFO,
        payload: {formName, slideDirection}
    };
};
