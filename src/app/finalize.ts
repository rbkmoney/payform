import * as ReactDOM from 'react-dom';
import { Transport } from 'cross-origin-communicator';
import { State } from './state';
import { ResultState } from 'checkout/state';
import { isSafetyUrl } from 'checkout/utils';
import { CommunicatorEvents } from '../communicator-constants';

class AppFinalizer {

    constructor(private transport: Transport, private checkoutEl: HTMLElement) {
    }

    close() {
        ReactDOM.unmountComponentAtNode(this.checkoutEl);
        this.transport.emit(CommunicatorEvents.close);
        this.transport.destroy();
    }

    done(redirectUrl: string, inFrame: boolean) {
        setTimeout(() => {
            ReactDOM.unmountComponentAtNode(this.checkoutEl);
            this.transport.emit(CommunicatorEvents.finished);
            this.transport.destroy();
            if (inFrame) {
                redirectUrl && isSafetyUrl(redirectUrl) ? location.replace(redirectUrl) : window.close();
            }
        }, 6000);
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
