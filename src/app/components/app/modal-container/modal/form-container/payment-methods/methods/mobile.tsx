import * as React from 'react';

import { FormName, MobileFormInfo } from 'checkout/state';
import { MethodProps } from './method-props';
import { Method } from 'checkout/components/app/modal-container/modal/form-container/payment-methods/methods/method';
import { Title } from 'checkout/components/app/modal-container/modal/form-container/payment-methods/methods/title';
import { Text } from 'checkout/components/app/modal-container/modal/form-container/payment-methods/methods/text';
import { Icon } from 'checkout/components/app/modal-container/modal/form-container/payment-methods/methods/icon/icon';

const toMobile = (props: MethodProps) => props.setFormInfo(new MobileFormInfo(FormName.paymentMethods));

export const Mobile: React.FC<MethodProps> = (props) => (
    <Method onClick={toMobile.bind(null, props)} id="mobile-payment-method">
        <Icon name="mobile" />
        <Text>
            <Title>{props.locale['form.payment.method.name.phone.label']}</Title>
        </Text>
    </Method>
);
