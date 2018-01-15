import { LogicError } from 'checkout/backend';

export enum ErrorStatus {
    unhandled = 'unhandled',
    accepted = 'accepted'
}

export interface ErrorState {
    status: ErrorStatus;
    error?: LogicError;
}
