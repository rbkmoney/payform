import * as ReactDOM from 'react-dom';
import { Transport, PossibleEvents } from '../communication-ts';
import { State } from './state';
import { ResultState } from './state/result-state';

class AppFinalizer {

    private actionTimeout = 300;

    constructor(private transport: Transport, private checkoutEl: HTMLElement) {
    }

    close() {
        ReactDOM.unmountComponentAtNode(this.checkoutEl);
        setTimeout(() => {
            this.transport.emit(PossibleEvents.close);
            this.transport.destroy();
        }, this.actionTimeout);
    }

    done(redirectUrl: string, popupMode: boolean) {
        ReactDOM.unmountComponentAtNode(this.checkoutEl);
        setTimeout(() => {
            this.transport.emit(PossibleEvents.done);
            this.transport.destroy();
            if (popupMode) {
                redirectUrl ? location.replace(redirectUrl) : window.close();
            }
        }, this.actionTimeout);
    }
}

export function finalize(state: State, transport: Transport, checkoutEl: HTMLElement) {
    const finalizer = new AppFinalizer(transport, checkoutEl);
    switch (state.result) {
        case ResultState.close:
            finalizer.close();
            break;
        case ResultState.done:
            const initConfig = state.config.initConfig;
            finalizer.done(initConfig.redirectUrl, initConfig.popupMode);
            break;
    }
}
