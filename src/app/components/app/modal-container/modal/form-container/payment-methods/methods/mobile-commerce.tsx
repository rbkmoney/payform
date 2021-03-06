import * as React from 'react';

import { FormName, MobileCommerceFormInfo } from 'checkout/state';
import { MethodProps } from './method-props';
import { Method } from './method';
import { Title } from './title';
import { Text } from './text';
import { Icon } from './icon/icon';

const toMobileCommerce = (props: MethodProps) => props.setFormInfo(new MobileCommerceFormInfo(FormName.paymentMethods));

export const MobileCommerce: React.FC<MethodProps> = (props) => (
    <Method onClick={toMobileCommerce.bind(null, props)} id="mobile-commerce-payment-method">
        <Icon name="mobile-commerce" />
        <Text>
            <Title>{props.locale['form.payment.method.name.mobile.commerce.label']}</Title>
        </Text>
    </Method>
);
