import { LogicError } from 'checkout/backend';

export enum ErrorHandleStatus {
    unhandled = 'unhandled',
    processed = 'processed'
}

export interface ErrorState {
    readonly status: ErrorHandleStatus;
    readonly error: LogicError;
}
