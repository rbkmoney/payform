import * as React from 'react';
import { formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import * as styles from './card-number.scss';
import { Icon, IconType } from 'checkout/components/ui/icon';
import { Card, CardTypes, cardFromNumber } from '../card-info';
import { FormName, State } from 'checkout/state';

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

function findIcon(brand: CardTypes): IconType {
    return Object.keys(IconType).find((key) => key === brand) as IconType;
}

const CardTypeIconDef: React.FC<CardTypeIconProps> = (props) => {
    const cardType = getCardType(props.cardNumber);
    const icon = cardType ? findIcon(cardType.type) : null;
    return icon ? <Icon className={styles.cardTypeIcon} icon={icon} /> : null;
};

const selector = formValueSelector(FormName.cardForm);

const mapStateToProps = (state: State) => ({
    cardNumber: selector(state, 'cardNumber')
});

export const CardTypeIcon = connect(mapStateToProps)(CardTypeIconDef);
