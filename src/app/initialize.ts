import { listen, Transport } from 'cross-origin-communicator';
import * as creditCardType from 'credit-card-type';

import { getUrlParams } from 'checkout/utils';
import { isInFrame } from '../is-in-iframe';
import { getOrigin } from '../get-origin';
import { StubTransport } from './stub-transport';
import { Config, resolveInitConfig } from 'checkout/config';
import { CommunicatorEvents, communicatorInstanceName } from '../communicator-constants';
import { UserConfig } from 'checkout/config/config-resolver/user-config';

/**
 * Adding available bank cards
 */
// TODO: update credit-card-type
(creditCardType as any).addCard({
    niceType: 'TestCard',
    type: 'test-card',
    patterns: [1234],
    gaps: [4, 8, 12],
    lengths: [16],
    code: {
        name: 'CVV',
        size: 3
    }
});

const isUriContext = () => !!location.search;

const resolveCommunicatorParams = async (): Promise<[Transport, UserConfig]> => {
    const transport = await listen(communicatorInstanceName);
    const userConfig = await new Promise<UserConfig>((resolve) => transport.on(CommunicatorEvents.init, resolve));
    return [transport, userConfig];
};

const resolveUriParams = async (): Promise<[Transport, UserConfig]> => {
    let transport;
    try {
        transport = await listen(communicatorInstanceName, window.opener ? 2000 : 0);
    } catch (e) {
        transport = new StubTransport();
    }
    const userConfig: UserConfig = getUrlParams(location.search);
    return [transport, userConfig];
};

const resolveInitParams = () => (isUriContext() ? resolveUriParams() : resolveCommunicatorParams());

export const initialize = async (): Promise<[Transport, Config]> => {
    const [transport, params] = await resolveInitParams();
    try {
        const config: Config = {
            origin: getOrigin(),
            inFrame: isInFrame(),
            initConfig: resolveInitConfig(params)
        };
        return [transport, config];
    } catch (e) {
        console.error(e);
        transport.emit(CommunicatorEvents.close);
        throw e;
    }
};
