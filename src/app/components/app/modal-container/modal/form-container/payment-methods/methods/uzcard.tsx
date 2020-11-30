import * as React from 'react';

import { UzcardFormInfo } from 'checkout/state';
import { MethodProps } from './method-props';
import { Method } from './method';
import { Title } from './title';
import { Text } from './text';
import { Icon } from './icon/icon';

const toUzcard = (props: MethodProps) => props.setFormInfo(new UzcardFormInfo(props.prevFormName));

export const Uzcard: React.FC<MethodProps> = (props) => (
    <Method onClick={toUzcard.bind(null, props)} id="uzcard-payment-method">
        <Icon name="uzcard" />
        <Text>
            <Title>{props.locale['form.payment.method.name.uzcard.label']}</Title>
        </Text>
    </Method>
);
