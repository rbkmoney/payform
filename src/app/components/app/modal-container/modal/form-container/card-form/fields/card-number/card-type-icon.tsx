import * as React from 'react';
import * as styles from './card-number.scss';
import { Icon } from '../../../../../../../ui/icon';
import * as creditCardType from 'credit-card-type';

interface CardTypeIconProps {
    cardNumber: string
}

function getCardType(cardNumber: string): creditCardType.CardBrand | null {
    if (!cardNumber) {
        return null;
    }
    const typeInfo = creditCardType(cardNumber.replace(/\s/g, ''));
    return typeInfo.length > 0 ? typeInfo[0].type : null;
}

export const CardTypeIcon: React.SFC<CardTypeIconProps> = (props) => {
    const cardType = getCardType(props.cardNumber);
    return (cardType ? <Icon className={styles.cardTypeIcon} icon={cardType}/> : null);
};
