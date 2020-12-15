import * as React from 'react';
import { CardFormInfo, FormName } from 'checkout/state';
import { MethodProps } from './method-props';
import { Method } from './method';
import { Title } from './title';
import { Icon } from './icon/icon';

const toBankCard = (props: MethodProps) => props.setFormInfo(new CardFormInfo(FormName.paymentMethods));

export const BankCard: React.FC<MethodProps> = (props) => (
    <Method onClick={toBankCard.bind(null, props)} id="bank-card-payment-method">
        <Icon name="bank-card" />
        <Title>{props.locale['form.payment.method.name.card.label']}</Title>
    </Method>
);
