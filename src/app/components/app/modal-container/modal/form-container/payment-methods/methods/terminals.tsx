import * as React from 'react';

import {
    FormName,
    PaymentMethodsGroupForm,
    PaymentMethodGroupName,
    EurosetFormInfo,
    FormInfo,
    PaymentMethod,
    PaymentMethodName,
    AlipayFormInfo
} from 'checkout/state';
import { MethodProps } from './method-props';
import { Description } from 'checkout/components/app/modal-container/modal/form-container/payment-methods/methods/description';
import { Method } from 'checkout/components/app/modal-container/modal/form-container/payment-methods/methods/method';
import { Title } from 'checkout/components/app/modal-container/modal/form-container/payment-methods/methods/title';
import { Text } from 'checkout/components/app/modal-container/modal/form-container/payment-methods/methods/text';
import { Icon } from 'checkout/components/app/modal-container/modal/form-container/payment-methods/methods/icon/icon';

function createForm(paymentMethodName: PaymentMethodName | PaymentMethodGroupName) {
    switch (paymentMethodName) {
        case PaymentMethodName.Euroset:
            return new EurosetFormInfo(FormName.paymentMethods);
        case PaymentMethodName.Alipay:
            return new AlipayFormInfo(FormName.paymentMethods);
        default:
            return null;
    }
}

const toTerminals = (setFormInfo: (formInfo: FormInfo) => any, paymentMethods: PaymentMethod[]) =>
    setFormInfo(
        paymentMethods.length === 1
            ? createForm(paymentMethods[0].name)
            : new PaymentMethodsGroupForm(PaymentMethodGroupName.Terminals, FormName.paymentMethods)
    );

export const Terminals: React.FC<MethodProps> = (props) => (
    <Method onClick={toTerminals.bind(null, props.setFormInfo, props.method.children)} id="terminals-payment-method">
        <Icon name="terminals" />
        <Text>
            <Title>{props.locale['form.payment.method.name.terminals.label']}</Title>
            <Description>{props.locale['form.payment.method.description.euroset.text']}</Description>
        </Text>
    </Method>
);
