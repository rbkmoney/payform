import * as ReactDOM from 'react-dom';
import { State, ResultState } from './state';

export function finalize(state: State, checkoutEl: HTMLElement) {
    ReactDOM.unmountComponentAtNode(checkoutEl);
    const initConfig = state.config.initConfig;
    if (state.result === ResultState.done && initConfig.popupMode) {
        setTimeout(() => initConfig.redirectUrl
            ? location.replace(initConfig.redirectUrl)
            : window.close(), 300);
    }
}
