import * as React from 'react';

import { FormName, EurosetFormInfo } from 'checkout/state';
import { MethodProps } from './method-props';
import { Method } from 'checkout/components/app/modal-container/modal/form-container/payment-methods/methods/method';
import { Title } from 'checkout/components/app/modal-container/modal/form-container/payment-methods/methods/title';
import { Text } from 'checkout/components/app/modal-container/modal/form-container/payment-methods/methods/text';
import { Icon } from 'checkout/components/app/modal-container/modal/form-container/payment-methods/methods/icon/icon';

const toEuroset = (props: MethodProps) => props.setFormInfo(new EurosetFormInfo(FormName.paymentMethods));

export const Euroset: React.FC<MethodProps> = (props) => (
    <Method onClick={toEuroset.bind(null, props)} id="terminal-payment-method">
        <Icon name="terminals" />
        <Text>
            <Title>{props.locale['form.payment.method.name.euroset.label']}</Title>
        </Text>
    </Method>
);
