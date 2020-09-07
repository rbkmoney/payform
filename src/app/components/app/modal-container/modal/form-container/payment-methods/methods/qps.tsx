import * as React from 'react';

import { QPSFormInfo } from 'checkout/state';
import { MethodProps } from './method-props';
import { Method } from 'checkout/components/app/modal-container/modal/form-container/payment-methods/methods/method';
import { Title } from 'checkout/components/app/modal-container/modal/form-container/payment-methods/methods/title';
import { Text } from 'checkout/components/app/modal-container/modal/form-container/payment-methods/methods/text';
import { Icon } from 'checkout/components/app/modal-container/modal/form-container/payment-methods/methods/icon/icon';

const toQPS = (props: MethodProps) => props.setFormInfo(new QPSFormInfo(props.prevFormName));

export const QPS: React.FC<MethodProps> = (props) => (
    <Method onClick={toQPS.bind(null, props)} id="qps-payment-method">
        <Icon name="qps" />
        <Text>
            <Title>{props.locale['form.payment.method.name.qps.label']}</Title>
        </Text>
    </Method>
);
