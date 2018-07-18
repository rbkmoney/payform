import { deserialize } from 'checkout/utils';
import { listen, Transport } from '../communicator';
import { isInFrame } from '../is-in-iframe';
import { getOrigin } from '../get-origin';
import { StubTransport } from './stub-transport';
import { Config, resolveInitConfig } from 'checkout/config';

const isUriContext = !!location.search;

const handleInit = (transport: Transport) => new Promise((resolve) =>
    transport.on('checkout-init', (config) => resolve(config)));

const listenAndCatch = () =>
    listen('checkout-initializer', window.opener ? 2000 : 0)
        .catch(() => new StubTransport());

const resolveCommunicatorParams = () =>
    listen('checkout-initializer')
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
