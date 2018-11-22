import * as React from 'react';
import { CardFormInfo, FormName } from 'checkout/state';
import { BankCardIcon } from './icons/bank-card-icon';
import { MethodProps } from './method-props';
import { Method } from 'checkout/components/app/modal-container/modal/form-container/payment-methods/methods/method';
import { Title } from 'checkout/components/app/modal-container/modal/form-container/payment-methods/methods/title';

const toBankCard = (props: MethodProps) => props.setFormInfo(new CardFormInfo(FormName.paymentMethods));

export const BankCard: React.SFC<MethodProps> = (props) => (
    <Method onClick={toBankCard.bind(null, props)} id="bank-card-payment-method">
        <BankCardIcon />
        <Title>{props.locale['form.payment.method.name.card.label']}</Title>
    </Method>
);
