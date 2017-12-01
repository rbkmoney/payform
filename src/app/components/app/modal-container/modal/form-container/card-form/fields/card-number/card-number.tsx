import * as React from 'react';
import * as styles from './card-number.scss';
import { Input } from '../../../input';
import { CardTypeIcon } from './card-type-icon';
import { IconType } from 'checkout/components';
import { cardNumberFormatter } from '../format';

interface CardNumberProps {
    currentValue?: any;
    onChange?: any;
}

export const CardNumber: React.SFC<CardNumberProps> = (props) => {
    return (<div className={styles.inputContainer}>
        <Input onChange={props.onChange} currentValue={props.currentValue.val} formatter={cardNumberFormatter} className={styles.cardNumberInput} icon={IconType.card} placeholder='Номер на карте'/>
        <CardTypeIcon cardNumber={'visa'}/>
    </div>
)};
