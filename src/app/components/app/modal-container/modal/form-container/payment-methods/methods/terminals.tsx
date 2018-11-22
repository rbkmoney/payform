import * as React from 'react';

import { TerminalsIcon } from './icons/terminals-icon';
import { FormName, TerminalFormInfo } from 'checkout/state';
import { MethodProps } from './method-props';
import { Description } from 'checkout/components/app/modal-container/modal/form-container/payment-methods/methods/description';
import { Method } from 'checkout/components/app/modal-container/modal/form-container/payment-methods/methods/method';
import { Title } from 'checkout/components/app/modal-container/modal/form-container/payment-methods/methods/title';
import { Text } from 'checkout/components/app/modal-container/modal/form-container/payment-methods/methods/text';

const toTerminals = (props: MethodProps) => props.setFormInfo(new TerminalFormInfo(FormName.paymentMethods));

export const Terminals: React.SFC<MethodProps> = (props) => (
    <Method onClick={toTerminals.bind(null, props)} id="terminal-payment-method">
        <TerminalsIcon />
        <Text>
            <Title>{props.locale['form.payment.method.name.cash.label']}</Title>
            <Description>{props.locale['form.payment.method.description.euroset.text']}</Description>
        </Text>
    </Method>
);
