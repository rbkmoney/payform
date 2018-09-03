import { ReactNode } from 'react';

export enum ResultFormType {
    ERROR = 'error',
    WARNING = 'warning',
    SUCCESS = 'success'
}

export interface ResultFormContent {
    hasActions: boolean;
    hasDone: boolean;
    header: string;
    description?: ReactNode;
    type: ResultFormType;
}
