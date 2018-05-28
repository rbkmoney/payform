import { put, PutEffect, select, SelectEffect } from 'redux-saga/effects';
import { InitializeAmountInfoCompleted, TypeKeys } from 'checkout/actions';
import { AmountInfoState, ModelState, State } from 'checkout/state';
import { InitConfig } from 'checkout/config';
import { getAmountInfo } from '../../amount-info';

export type Effect = PutEffect<InitializeAmountInfoCompleted> | SelectEffect | AmountInfoState;

export function* initializeAmountInfo(initConfig: InitConfig, model: ModelState): Iterator<Effect> {
    yield put({
        type: TypeKeys.INITIALIZE_AMOUNT_INFO_COMPLETED,
        payload: getAmountInfo(initConfig, model)
    } as InitializeAmountInfoCompleted);
    return yield select((s: State) => s.amountInfo);
}
