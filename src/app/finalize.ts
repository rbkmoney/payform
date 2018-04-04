import * as ReactDOM from 'react-dom';
import { Transport, PossibleEvents } from '../communication';
import { State } from './state';
import { ResultState } from 'checkout/state';
import { isSafetyUrl } from 'checkout/utils';

class AppFinalizer {

    constructor(private transport: Transport, private checkoutEl: HTMLElement) {
    }

    close() {
        ReactDOM.unmountComponentAtNode(this.checkoutEl);
        this.transport.emit(PossibleEvents.close);
        this.transport.destroy();
    }

    done(redirectUrl: string, inFrame: boolean) {
        setTimeout(() => {
            ReactDOM.unmountComponentAtNode(this.checkoutEl);
            this.transport.emit(PossibleEvents.done);
            this.transport.destroy();
            if (inFrame) {
                redirectUrl && isSafetyUrl(redirectUrl) ? location.replace(redirectUrl) : window.close();
            }
        }, 4000);
    }
}

export function finalize(state: State, transport: Transport, checkoutEl: HTMLElement) {
    const finalizer = new AppFinalizer(transport, checkoutEl);
    switch (state.result) {
        case ResultState.close:
            finalizer.close();
            break;
        case ResultState.done:
            const config = state.config;
            const initConfig = config.initConfig;
            finalizer.done(initConfig.redirectUrl, config.inFrame);
            break;
    }
}
