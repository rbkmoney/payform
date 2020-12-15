import * as React from 'react';

import { QPSFormInfo } from 'checkout/state';
import { MethodProps } from './method-props';
import { Method } from './method';
import { Title } from './title';
import { Text } from './text';
import { Icon } from './icon/icon';

const toQPS = (props: MethodProps) => props.setFormInfo(new QPSFormInfo(props.prevFormName));

export const QPS: React.FC<MethodProps> = (props) => (
    <Method onClick={toQPS.bind(null, props)} id="qps-payment-method">
        <Icon name="qps" />
        <Text>
            <Title>{props.locale['form.payment.method.name.qps.label']}</Title>
        </Text>
    </Method>
);
