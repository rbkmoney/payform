import UrlUtils from '../utils/UrlUtils';
import isMobile from 'ismobilejs';

export default class StateResolver {

    static resolve(transport) {
        return new Promise((resolve) => {
            if (this.isSearchParamsState()) {
                return resolve(this.decodeSearchParams())
            } else {
                transport.on('init-payform', (state) => {
                    return resolve(state);
                });
            }
        });
    }

    static isSearchParamsState() {
        return !!location.search;
    }

    static decodeSearchParams() {
        const state = UrlUtils.decodeParams(location.search);
        state.payformHost = decodeURIComponent(state.payformHost);
        switch (state.popupMode) {
            case 'true':
                state.popupMode = true;
                break;
            case 'false':
                state.popupMode = false;
                break;
        }
        if (state.email && state.popupMode) {
            state.email = state.email.replace('%40', '@')
        }
        return state;
    }
}
