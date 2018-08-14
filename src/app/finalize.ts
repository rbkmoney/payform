import * as ReactDOM from 'react-dom';
import { Transport } from 'cross-origin-communicator';
import { State } from './state';
import { ResultState } from 'checkout/state';
import { isSafetyUrl } from 'checkout/utils';
import { CommunicatorEvents } from '../communicator-constants';
import { ResultAction } from 'checkout/actions';

class AppFinalizer {
    static CLOSE_TIMEOUT = 750;
    static DONE_TIMEOUT = 6000;

    constructor(private transport: Transport, private checkoutEl: HTMLElement) {}

    destroy(communicatorEvent: CommunicatorEvents) {
        ReactDOM.unmountComponentAtNode(this.checkoutEl);
        this.transport.emit(communicatorEvent);
        this.transport.destroy();
    }

    close() {
        setTimeout(() => this.destroy(CommunicatorEvents.close), AppFinalizer.CLOSE_TIMEOUT);
    }

    done(redirectUrl: string, inFrame: boolean, setResult: (resultState: ResultState) => ResultAction) {
        setTimeout(() => {
            setResult(ResultState.closeAfterDone);
            setTimeout(() => {
                this.destroy(CommunicatorEvents.finished);
                if (inFrame) {
                    redirectUrl && isSafetyUrl(redirectUrl) ? location.replace(redirectUrl) : window.close();
                }
            }, AppFinalizer.CLOSE_TIMEOUT);
        }, AppFinalizer.DONE_TIMEOUT - AppFinalizer.CLOSE_TIMEOUT);
    }
}

export function finalize(
    state: State,
    transport: Transport,
    checkoutEl: HTMLElement,
    setResult: (resultState: ResultState) => ResultAction
) {
    const finalizer = new AppFinalizer(transport, checkoutEl);
    switch (state.result) {
        case ResultState.close:
            finalizer.close();
            break;
        case ResultState.done:
            const {
                config: {
                    initConfig: { redirectUrl },
                    inFrame
                }
            } = state;
            finalizer.done(redirectUrl, inFrame, setResult);
            break;
    }
}
