import { GET_LOCALE } from '../constants/locale';

import LocaleLoader from '../loaders/LocaleLoader';

export function getLocale(locale) {
    return (dispatch) => {
        LocaleLoader.load(locale).then((response) => {
            dispatch({
                type: GET_LOCALE,
                payload: response
            });
        });
    };
}