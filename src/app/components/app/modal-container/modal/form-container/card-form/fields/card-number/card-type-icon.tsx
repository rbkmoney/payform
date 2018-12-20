import * as React from 'react';
import { formValueSelector } from 'redux-form';
import { connect } from 'react-redux';

import * as styles from './card-number.scss';
import { Card, CardTypes, cardFromNumber } from '../card-info';
import { FormName, State } from 'checkout/state';
import * as icons from 'checkout/components/ui/icon';

interface CardTypeIconProps {
    cardNumber: string;
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

const CardTypeIconDef: React.FC<CardTypeIconProps> = (props) => {
    const cardType = getCardType(props.cardNumber);
    const IconClass = cardType ? findIconClass(cardType.type) : null;
    return !!IconClass && <IconClass className={styles.cardTypeIcon} />;
};

const selector = formValueSelector(FormName.cardForm);

const mapStateToProps = (state: State) => ({
    cardNumber: selector(state, 'cardNumber')
});

export const CardTypeIcon = connect(mapStateToProps)(CardTypeIconDef);
