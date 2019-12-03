import * as React from 'react';

import { FormName, MobileFormInfo } from 'checkout/state';
import { MethodProps } from './method-props';
import { Method } from './method';
import { Title } from './title';
import { Text } from './text';
import { Icon } from './icon/icon';

const toMobile = (props: MethodProps) => props.setFormInfo(new MobileFormInfo(FormName.paymentMethods));

export const Mobile: React.FC<MethodProps> = (props) => (
    <Method onClick={toMobile.bind(null, props)} id="mobile-payment-method">
        <Icon name="mobile" />
        <Text>
            <Title>{props.locale['form.payment.method.name.phone.label']}</Title>
        </Text>
    </Method>
);
