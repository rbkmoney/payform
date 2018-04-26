import { call, CallEffect, put, PutEffect } from 'redux-saga/effects';
import { InitConfig } from 'checkout/config';
import { ModelState } from 'checkout/state';
import { InitConfigChecked, TypeKeys } from 'checkout/actions';
import { checkInitConfigCapability } from './check-inti-config-capability';

type Effects = CallEffect | PutEffect<InitConfigChecked>;

export function* checkInitConfig(initConfig: InitConfig, model: ModelState): Iterator<Effects> {
    const checkedInitConfig = yield call(checkInitConfigCapability, initConfig, model);
    yield put({
        type: TypeKeys.INIT_CONFIG_CHECKED,
        payload: checkedInitConfig
    } as InitConfigChecked);
}
