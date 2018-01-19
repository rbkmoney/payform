import {FormName, SlideDirection} from 'checkout/state';
import {AbstractAction, TypeKeys} from 'checkout/actions';

export interface Navigation {
    formName: FormName,
    slideDirection: SlideDirection
}

export interface NavigateTo extends AbstractAction<Navigation> {
    type: TypeKeys.NAVIGATE_TO_FORM_INFO;
    payload: {
        formName: FormName,
        slideDirection: SlideDirection
    };
}
