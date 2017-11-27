import * as ReactDOM from 'react-dom';
import { Transport, PossibleEvents } from '../communication-ts';
import { ResultState } from './state';

class AppFinalizer {

    private actionTimeout = 300;

    constructor(private transport: Transport, private checkoutEl: HTMLElement) { }

    close() {
        ReactDOM.unmountComponentAtNode(this.checkoutEl);
        setTimeout(() => {
            this.transport.emit(PossibleEvents.close);
            this.transport.destroy();
        }, this.actionTimeout);
    }

    done(redirectUrl?: string, popupMode?: boolean) {
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

export function finalize(result: ResultState, transport: Transport, checkoutEl: HTMLElement, redirectUrl?: string, popupMode?: boolean) {
    const finalizer = new AppFinalizer(transport, checkoutEl);
    switch (result) {
        case ResultState.close:
            finalizer.close();
            break;
        case ResultState.done:
            finalizer.done(redirectUrl, popupMode);
            break;
    }
}
