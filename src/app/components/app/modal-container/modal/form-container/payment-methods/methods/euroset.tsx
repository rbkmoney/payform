import * as React from 'react';

import { EurosetFormInfo } from 'checkout/state';
import { MethodProps } from './method-props';
import { Method } from './method';
import { Title } from './title';
import { Text } from './text';
import { Icon } from './icon/icon';

const toEuroset = (props: MethodProps) => props.setFormInfo(new EurosetFormInfo(props.prevFormName));

export const Euroset: React.FC<MethodProps> = (props) => (
    <Method onClick={toEuroset.bind(null, props)} id="terminal-payment-method">
        <Icon name="terminals" />
        <Text>
            <Title>{props.locale['form.payment.method.name.euroset.label']}</Title>
        </Text>
    </Method>
);
