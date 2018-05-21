import { put, PutEffect } from 'redux-saga/effects';
import { InitializeAmountInfoCompleted, TypeKeys } from 'checkout/actions';
import { ModelState } from 'checkout/state';
import { InitConfig } from 'checkout/config';
import { getAmountInfo } from './get-amount-info';

export type Effect = PutEffect<InitializeAmountInfoCompleted>;

export function* initializeAmountConfig(initConfig: InitConfig, model: ModelState): Iterator<Effect> {
    yield put({
        type: TypeKeys.INITIALIZE_AMOUNT_INFO_COMPLETED,
        payload: getAmountInfo(initConfig, model)
    } as InitializeAmountInfoCompleted);
}
