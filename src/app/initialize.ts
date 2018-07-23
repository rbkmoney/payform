import { listen, Transport } from 'cross-origin-communicator';
import { deserialize } from 'checkout/utils';
import { isInFrame } from '../is-in-iframe';
import { getOrigin } from '../get-origin';
import { StubTransport } from './stub-transport';
import { Config, resolveInitConfig } from 'checkout/config';
import { CommunicatorEvents, communicatorInstanceName } from '../communicator-constants';

const isUriContext = !!location.search;

const handleInit = (transport: Transport) => new Promise((resolve) =>
    transport.on(CommunicatorEvents.init, (config) => resolve(config)));

const listenAndCatch = () =>
    listen(communicatorInstanceName, window.opener ? 2000 : 0)
        .catch(() => new StubTransport());

const resolveCommunicatorParams = () =>
    listen(communicatorInstanceName)
        .then((transport) => Promise.all([
            transport,
            handleInit(transport)
        ]));

const resolveUriParams = () =>
    listenAndCatch().then((transport) => Promise.all([
        transport,
        deserialize(location.search)
    ]));

const resolveInitParams = () =>
    isUriContext
        ? resolveUriParams()
        : resolveCommunicatorParams();

export const initialize = (): Promise<Array<Transport | Config>> =>
    resolveInitParams().then((res) => {
        const [transport, params] = res;
        const config = {
            origin: getOrigin(),
            inFrame: isInFrame(),
            initConfig: resolveInitConfig(params)
        };
        return [transport, config];
    });
