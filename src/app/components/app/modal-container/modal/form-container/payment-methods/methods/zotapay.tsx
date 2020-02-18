import * as React from 'react';

import { FormName, ZotapayFormInfo } from 'checkout/state';
import { MethodProps } from './method-props';
import { Method } from 'checkout/components/app/modal-container/modal/form-container/payment-methods/methods/method';
import { Title } from 'checkout/components/app/modal-container/modal/form-container/payment-methods/methods/title';
import { Text } from 'checkout/components/app/modal-container/modal/form-container/payment-methods/methods/text';
import { Icon } from 'checkout/components/app/modal-container/modal/form-container/payment-methods/methods/icon/icon';

const toZotapay = (props: MethodProps) => props.setFormInfo(new ZotapayFormInfo(FormName.paymentMethods));

export const Zotapay: React.FC<MethodProps> = (props) => (
    <Method onClick={toZotapay.bind(null, props)} id="zotapay-payment-method">
        <Icon name="terminals" />
        <Text>
            <Title>{props.locale['form.payment.method.name.zotapay.label']}</Title>
        </Text>
    </Method>
);
