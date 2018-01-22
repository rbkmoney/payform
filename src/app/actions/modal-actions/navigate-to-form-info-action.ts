import {FormName} from 'checkout/state';
import {AbstractAction, TypeKeys} from 'checkout/actions';

export interface Navigation {
    formName: FormName;
    direction: NavigateDirection;
}

export enum NavigateDirection {
    back = 'back',
    forward = 'forward'
}

export interface NavigateTo extends AbstractAction<Navigation> {
    type: TypeKeys.NAVIGATE_TO_FORM_INFO;
    payload: {
        formName: FormName,
        direction: NavigateDirection
    };
}

export const navigateTo = (formName: FormName, direction: NavigateDirection): NavigateTo => {
    return {
        type: TypeKeys.NAVIGATE_TO_FORM_INFO,
        payload: {formName, direction}
    };
};
