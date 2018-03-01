import { AbstractAction, TypeKeys } from 'checkout/actions';
import { LogicError } from 'checkout/backend';
import { InitConfig } from 'checkout/config';

export interface InitializeAppRequested extends AbstractAction<InitConfig> {
    type: TypeKeys.INITIALIZE_APP_REQUESTED;
    payload: InitConfig;
}

export interface InitializeAppCompleted extends AbstractAction {
    type: TypeKeys.INITIALIZE_APP_COMPLETED;
}

export interface InitializeAppFailed extends AbstractAction<LogicError> {
    type: TypeKeys.INITIALIZE_APP_FAILED;
    payload: LogicError;
}

export const initializeApp = (config: InitConfig) => ({
    type: TypeKeys.INITIALIZE_APP_REQUESTED,
    payload: config
});
