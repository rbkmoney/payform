import * as React from 'react';
import { formValueSelector } from 'redux-form';
import { connect } from 'react-redux';

import { Card, CardTypes, cardFromNumber } from '../card-info';
import { FormName, State } from 'checkout/state';
import * as icons from 'checkout/components/ui/icon';
import styled from 'checkout/styled-components';
import { growth } from 'checkout/styled-components/animations';

interface CardTypeIconProps {
    cardNumber: string;
    className?: string;
}

function getCardType(cardNumber: string): Card | null {
    if (!cardNumber) {
        return null;
    }
    const typeInfo = cardFromNumber(cardNumber.replace(/\s/g, ''));
    return typeInfo ? typeInfo : null;
}

function findIconClass(brand: CardTypes): React.ComponentType<any> {
    return (icons as any)[Object.keys(icons).find((key) => key.toLowerCase() === brand)];
}

const CardTypeIconDef = styled<React.FC<CardTypeIconProps>>((props) => {
    const cardType = getCardType(props.cardNumber);
    const IconClass = cardType ? findIconClass(cardType.type) : null;
    return IconClass ? <IconClass className={props.className} /> : null;
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
