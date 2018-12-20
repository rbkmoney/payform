import * as React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import { FormInfo, PaymentMethod } from 'checkout/state';
import { Locale } from 'checkout/locale';
import { getMethods } from './get-methods';
import { list, appear, leave } from './methods.scss';
import { PaymentRequestedPayload } from 'checkout/actions';

export interface MethodsProps {
    methods: PaymentMethod[];
    locale: Locale;
    setFormInfo: (formInfo: FormInfo) => any;
    pay: (payload: PaymentRequestedPayload) => any;
    amountPrefilled: boolean;
    emailPrefilled: boolean;
}

export const Methods: React.FC<MethodsProps> = (props) => {
    const { methods, locale, setFormInfo, pay, amountPrefilled, emailPrefilled } = props;
    return (
        <CSSTransitionGroup
            component="ul"
            className={list}
            transitionName={{ enter: null, appear, leave }}
            transitionEnter={false}
            transitionAppear={true}
            transitionAppearTimeout={1000}
            transitionLeaveTimeout={1000}>
            {getMethods(methods, { locale, setFormInfo, pay, amountPrefilled, emailPrefilled })}
        </CSSTransitionGroup>
    );
};
