import { listen, Transport } from 'cross-origin-communicator';

import { getUrlParams } from 'checkout/utils';
import { isInFrame } from '../is-in-iframe';
import { getOrigin } from '../get-origin';
import { StubTransport } from './stub-transport';
import { Config, resolveInitConfig } from 'checkout/config';
import { CommunicatorEvents, communicatorInstanceName } from '../communicator-constants';
import { UserConfig } from 'checkout/config/config-resolver/user-config';
import { ExtInitConfig } from './config/ext-init-config';

const isUriContext = () => !!location.search;

const getTransport = async (): Promise<Transport> => {
    if (isUriContext()) {
        try {
            return await listen(communicatorInstanceName, window.opener ? 2000 : 0);
        } catch (e) {
            return new StubTransport();
        }
    }
    return await listen(communicatorInstanceName);
};

const resolveInitParams = async (transport: Transport): Promise<UserConfig> => {
    if (isUriContext()) {
        return getUrlParams(location.search);
    }
    return await new Promise<UserConfig>((resolve) => transport.on(CommunicatorEvents.init, resolve));
};

const resolveExtInitParams = (transport: Transport): Promise<ExtInitConfig> => {
    return new Promise<ExtInitConfig>((resolve) => transport.on(CommunicatorEvents.extInit, resolve));
};

export const initialize = async (): Promise<[Transport, Config]> => {
    const transport = await getTransport();
    const [basicInitParams, extInitParams] = await Promise.all([
        resolveInitParams(transport),
        resolveExtInitParams(transport)
    ]);
    const initParams = { ...basicInitParams, ...extInitParams };
    try {
        const config: Config = {
            origin: getOrigin(),
            inFrame: isInFrame(),
            initConfig: resolveInitConfig(initParams)
        };
        return [transport, config];
    } catch (e) {
        console.error(e);
        transport.emit(CommunicatorEvents.close);
        throw e;
    }
};
