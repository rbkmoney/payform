import { delay } from 'redux-saga';
import { call, race, RaceEffect } from 'redux-saga/effects';

export function* prepareYaPayment(yaPayment: YaPay.Payment, delayMs = 2000): Iterator<RaceEffect | boolean> {
    try {
        const [timeout] = yield race<any>([call(delay, delayMs), call(yaPayment.prepare)]);
        return !timeout;
    } catch (ex) {
        return false;
    }
}
