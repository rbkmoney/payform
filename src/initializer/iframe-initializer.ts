import { IframeContainer } from './iframe-container';
import { PossibleEvents, Parent } from '../communication';
import { Initializer } from './initializer';

export class IframeInitializer extends Initializer {

    private container: IframeContainer;

    constructor(origin: string, userConfig: any) {
        super(origin, userConfig);
        this.container = new IframeContainer(origin);
    }

    open() {
        const target = (window.frames as any)[this.container.getName()];
        this.container.show();
        const parent = new Parent(target, this.origin);
        parent.sendHandshake().then((transport) => {
            this.opened();
            transport.emit(PossibleEvents.init, this.config);
            transport.on(PossibleEvents.done, () => {
                this.close();
                this.finished();
            });
            transport.on(PossibleEvents.close, () => {
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
