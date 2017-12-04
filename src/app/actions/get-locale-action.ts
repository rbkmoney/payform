import { Dispatch } from 'redux';
import { AbstractAction, TypeKeys, SetErrorAction } from '.';
import { getLocale } from 'checkout/backend';

export interface GetLocaleAction extends AbstractAction<object> {
    type: TypeKeys.GET_LOCALE;
    payload: object;
}

export type GetLocaleDispatch = (dispatch: Dispatch<object | SetErrorAction>) => void;

export const getLocaleAction = (locale: string): GetLocaleDispatch =>
    (dispatch) => getLocale(locale)
        .then((localeConfig) => dispatch({
            type: TypeKeys.GET_LOCALE,
            payload: localeConfig
        }))
        .catch((error) => dispatch({
            type: TypeKeys.SET_ERROR,
            payload: {
                message: 'Failed to load locale'
            }
        }));
