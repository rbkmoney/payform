import * as React from 'react';
import * as styles from './card-number.scss';
import { Icon, IconType } from 'checkout/components/ui/icon';
import * as creditCardType from 'credit-card-type';

interface CardTypeIconProps {
    cardNumber: string;
}

type CardBrand = creditCardType.CardBrand;

function getCardType(cardNumber: string): CardBrand | null {
    if (!cardNumber) {
        return null;
    }
    const typeInfo = creditCardType(cardNumber.replace(/\s/g, ''));
    return typeInfo.length > 0 ? typeInfo[0].type : null;
}

function toIconType(brand: CardBrand): IconType {
    return brand as IconType;
}

export const CardTypeIcon: React.SFC<CardTypeIconProps> = (props) => {
    const cardType = getCardType(props.cardNumber);
    return (cardType ? <Icon className={styles.cardTypeIcon} icon={toIconType(cardType)}/> : null);
};
