import { call, race } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { logPrefix } from 'checkout/log-messages';
import { getScript } from 'checkout/utils';

export function* loadThirdPartLib(libEndpoint: string, delayMs = 2000) {
    const [timeout] = yield race<any>([call(delay, delayMs), call(getScript, libEndpoint)]);
    if (timeout) {
        console.warn(`${logPrefix} Load timeout ${libEndpoint}`);
    }
    return !timeout;
}
