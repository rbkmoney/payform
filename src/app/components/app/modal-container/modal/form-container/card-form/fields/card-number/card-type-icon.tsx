import * as React from 'react';
import * as styles from './card-number.scss';
import { Icon, IconType } from 'checkout/components/ui/icon';
import { cardFromNumber } from 'checkout/components/app/modal-container/modal/form-container/card-form/fields/common-card-tools/card-from-number';
import {
    Card,
    CardTypes
} from 'checkout/components/app/modal-container/modal/form-container/card-form/fields/common-card-tools';

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

export const CardTypeIcon: React.SFC<CardTypeIconProps> = (props) => {
    const cardType = getCardType(props.cardNumber);
    const icon = cardType ? findIcon(cardType.type) : null;
    return (icon ? <Icon className={styles.cardTypeIcon} icon={icon}/> : null);
};
