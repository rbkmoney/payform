import * as React from 'react';
import { Field } from 'redux-form';
import * as styles from './card-number.scss';
import { Input } from '../../../input';
import { CardTypeIcon } from './card-type-icon';
import { IconType } from 'checkout/components';
import { cardNumberFormatter } from '../format';
import { ChangeEvent } from 'react';

export const CardNumber: React.SFC = () => {
    return <div className={styles.inputContainer}>
        <Field name='cardNumber'
               component={(data: any) => (
                   <Input onChange={(e: ChangeEvent<HTMLInputElement>) => data.input.onChange((e.target as HTMLInputElement).value)}
                          currentValue={data.value}
                          formatter={cardNumberFormatter}
                          className={styles.cardNumberInput}
                          icon={IconType.card}
                          placeholder='Номер на карте'
                   />)}
        />
        <CardTypeIcon cardNumber={'visa'}/>
    </div>;
};
