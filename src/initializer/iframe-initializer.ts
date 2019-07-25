import { initialize } from 'cross-origin-communicator';

import { IframeContainer } from './iframe-container';
import { Initializer } from './initializer';
import { CommunicatorEvents, communicatorInstanceName } from '../communicator-constants';
import { OpenConfig } from '../app/config';

export class IframeInitializer extends Initializer {
    private container: IframeContainer;

    constructor(origin: string, userConfig: any) {
        super(origin, userConfig);
        this.container = new IframeContainer(origin);
    }

    open({ metadata, ...config }: OpenConfig = {}) {
        const target = (window.frames as any)[this.container.getName()];
        this.container.show();
        initialize(target, this.origin, communicatorInstanceName).then((transport) => {
            this.opened();
            transport.emit(CommunicatorEvents.init, { ...this.config, ...config });
            transport.emit(CommunicatorEvents.extInit, { metadata });
            transport.on(CommunicatorEvents.finished, () => {
                transport.destroy();
                this.container.reinitialize();
                this.finished();
            });
            transport.on(CommunicatorEvents.close, () => {
                transport.destroy();
                this.close();
            });
        });
    }

    close() {
        this.container.reinitialize();
        this.closed();
    }
}
