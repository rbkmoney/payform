import * as React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';

import { FormInfo, PaymentMethod } from 'checkout/state';
import { Locale } from 'checkout/locale';
import { getMethods } from './get-methods';
import { appear, leave } from './methods.scss';
import { PaymentRequestedPayload } from 'checkout/actions';
import styled from 'checkout/styled-components';

const List = styled(CSSTransitionGroup)`
    margin: 0;
    padding: 0;
    list-style: none;
    min-height: 266px;
`;

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
        <List
            component="ul"
            transitionName={{ enter: null, appear, leave }}
            transitionEnter={false}
            transitionAppear={true}
            transitionAppearTimeout={1000}
            transitionLeaveTimeout={1000}>
            {getMethods(methods, { locale, setFormInfo, pay, amountPrefilled, emailPrefilled })}
        </List>
    );
};
