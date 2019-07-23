import * as React from 'react';
import { formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { number } from 'card-validator';

import { FormName, State } from 'checkout/state';
import * as icons from 'checkout/components/ui/icon';
import styled from 'checkout/styled-components';
import { growth } from 'checkout/styled-components/animations';

interface CardTypeIconProps {
    cardNumber: string;
    className?: string;
}

export function getCardIconClass(cardNumber: string) {
    const { card } = number(cardNumber);
    if (!card) {
        return;
    }
    const icon = (Object.entries(icons).find(([key]) => key.toLowerCase() === card.type) || [])[1];
    if (!icon) {
        return;
    }
    return icon;
}

const CardTypeIconDef = styled<React.FC<CardTypeIconProps>>(({ cardNumber, className }) => {
    const Icon = getCardIconClass(cardNumber);
    return Icon ? <Icon className={className} /> : null;
})`
    position: absolute;
    top: 15px;
    right: 15px;
    width: 31px;
    height: 19px;
    animation: ${growth} 0.5s;
`;

const selector = formValueSelector(FormName.cardForm);

const mapStateToProps = (state: State) => ({
    cardNumber: selector(state, 'cardNumber')
});

export const CardTypeIcon = connect(mapStateToProps)(CardTypeIconDef);
