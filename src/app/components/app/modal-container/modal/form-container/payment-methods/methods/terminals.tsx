import * as React from 'react';

import {
    FormName,
    PaymentMethodsGroupForm,
    PaymentMethodGroupName,
    EurosetFormInfo,
    FormInfo,
    PaymentMethod,
    PaymentMethodName,
    ZotapayFormInfo
} from 'checkout/state';
import { MethodProps } from './method-props';
import { Description } from 'checkout/components/app/modal-container/modal/form-container/payment-methods/methods/description';
import { Method } from 'checkout/components/app/modal-container/modal/form-container/payment-methods/methods/method';
import { Title } from 'checkout/components/app/modal-container/modal/form-container/payment-methods/methods/title';
import { Text } from 'checkout/components/app/modal-container/modal/form-container/payment-methods/methods/text';
import { Icon } from 'checkout/components/app/modal-container/modal/form-container/payment-methods/methods/icon/icon';
import { Locale } from '../../../../../../../../locale';

function createForm(paymentMethodName: PaymentMethodName | PaymentMethodGroupName) {
    switch (paymentMethodName) {
        case PaymentMethodName.Euroset:
            return new EurosetFormInfo(FormName.paymentMethods);
        case PaymentMethodName.ZotaPay:
            return new ZotapayFormInfo(FormName.paymentMethods);
        default:
            return null;
    }
}

function getDescription(paymentMethodName: PaymentMethodName | PaymentMethodGroupName): keyof Locale {
    switch (paymentMethodName) {
        case PaymentMethodName.Euroset:
            return 'form.payment.method.description.euroset.text';
        case PaymentMethodName.ZotaPay:
            return 'form.payment.method.description.zotapay.text';
        default:
            return null;
    }
}

const mapShortDescription: { [N in PaymentMethodName]?: keyof Locale } = {
    [PaymentMethodName.Euroset]: 'form.payment.method.description.short.euroset.text',
    [PaymentMethodName.ZotaPay]: 'form.payment.method.description.short.zotapay.text'
};

const toTerminals = (setFormInfo: (formInfo: FormInfo) => any, paymentMethods: PaymentMethod[]) =>
    setFormInfo(
        paymentMethods.length === 1
            ? createForm(paymentMethods[0].name)
            : new PaymentMethodsGroupForm(PaymentMethodGroupName.Terminals, FormName.paymentMethods)
    );

export const Terminals: React.FC<MethodProps> = (props) => {
    const description: string =
        props.method.children.length === 1
            ? props.locale[getDescription(props.method.children[0].name)]
            : props.method.children
                  .sort((a, b) => a.priority - b.priority)
                  .map(({ name }) => props.locale[mapShortDescription[name as PaymentMethodName]])
                  .filter((d) => d)
                  .slice(0, 2)
                  .join(', ');
    return (
        <Method
            onClick={toTerminals.bind(null, props.setFormInfo, props.method.children)}
            id="terminals-payment-method">
            <Icon name="terminals" />
            <Text>
                <Title>{props.locale['form.payment.method.name.terminals.label']}</Title>
                <Description>{description}</Description>
            </Text>
        </Method>
    );
};
