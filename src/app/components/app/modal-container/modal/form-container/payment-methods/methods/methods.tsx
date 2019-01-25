import * as React from 'react';

import { FormInfo, PaymentMethod } from 'checkout/state';
import { Locale } from 'checkout/locale';
import { getMethods } from './get-methods';
import { PaymentRequestedPayload } from 'checkout/actions';
import styled from 'checkout/styled-components';
import { stylableTransition, APPEAR, LEAVE } from 'checkout/styled-transition';
import { slidedown, slideup } from 'checkout/styled-components/animations';

const List = styled(stylableTransition)`
    margin: 0;
    padding: 0;
    list-style: none;
    min-height: 266px;

    ${APPEAR} {
        animation: ${slidedown} 0.75s;
    }

    ${LEAVE} {
        animation: ${slideup} 0.75s;
    }
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
        <List component="ul" appear={1000} leave={1000}>
            {getMethods(methods, { locale, setFormInfo, pay, amountPrefilled, emailPrefilled })}
        </List>
    );
};
