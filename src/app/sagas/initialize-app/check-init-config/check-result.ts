export enum UnavailableReason {
    capability = 'capability',
    validation = 'validation'
}

export interface CheckResult {
    available: boolean;
    reason?: UnavailableReason;
    message?: string;
}
