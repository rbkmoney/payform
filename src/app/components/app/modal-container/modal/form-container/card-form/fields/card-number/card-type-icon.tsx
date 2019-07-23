import * as React from 'react';
import { formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { number } from 'card-validator';

import { FormName, State } from 'checkout/state';
import * as cardIcons from 'checkout/components/ui/icon/card';
import styled from 'checkout/styled-components';
import { growth } from 'checkout/styled-components/animations';

interface CardTypeIconProps {
    cardNumber: string;
    className?: string;
}

const cardIconsMapping = {
    visa: cardIcons.Visa,
    mastercard: cardIcons.Mastercard,
    maestro: cardIcons.Maestro,
    mir: cardIcons.Mir,
    'american-express': cardIcons.AmericanExpress,
    'diners-club': cardIcons.DinersClub,
    discover: cardIcons.Discover
};

export function getCardIconClass(cardNumber: string) {
    const { card } = number(cardNumber);
    if (!card) {
        return;
    }
    return (cardIconsMapping as any)[card.type];
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
    background: #fff;
`;

const selector = formValueSelector(FormName.cardForm);

const mapStateToProps = (state: State) => ({
    cardNumber: selector(state, 'cardNumber')
});

export const CardTypeIcon = connect(mapStateToProps)(CardTypeIconDef);
