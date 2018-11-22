import * as React from 'react';
import { ResultFormType } from 'checkout/components/app/modal-container/modal/form-container/result-form/make-content';
import { ErrorIcon } from './error-icon';
import { WarningIcon } from './warning-icon';
import { SuccessIcon } from './success-icon';

interface ResultIconProps {
    type: ResultFormType;
}

export const ResultIcon: React.FC<ResultIconProps> = ({ type }) => {
    switch (type) {
        case ResultFormType.ERROR:
            return <ErrorIcon />;
        case ResultFormType.WARNING:
            return <WarningIcon />;
        case ResultFormType.SUCCESS:
        default:
            return <SuccessIcon />;
    }
};
