import * as React from 'react';

import { FormName, AlipayFormInfo } from 'checkout/state';
import { MethodProps } from './method-props';
import { Method } from 'checkout/components/app/modal-container/modal/form-container/payment-methods/methods/method';
import { Title } from 'checkout/components/app/modal-container/modal/form-container/payment-methods/methods/title';
import { Text } from 'checkout/components/app/modal-container/modal/form-container/payment-methods/methods/text';
import { Icon } from 'checkout/components/app/modal-container/modal/form-container/payment-methods/methods/icon/icon';

const toAlipay = (props: MethodProps) => props.setFormInfo(new AlipayFormInfo(FormName.paymentMethods));

export const Alipay: React.FC<MethodProps> = (props) => (
    <Method onClick={toAlipay.bind(null, props)} id="alipay-payment-method">
        <Icon name="terminals" />
        <Text>
            <Title>{props.locale['form.payment.method.name.alipay.label']}</Title>
        </Text>
    </Method>
);
