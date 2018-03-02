import { LogicError } from 'checkout/backend';

type Error = LogicError;

export interface InitializeAppState {
    initialized: boolean;
    error?: Error;
}
