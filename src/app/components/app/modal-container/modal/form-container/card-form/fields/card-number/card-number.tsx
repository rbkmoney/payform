import * as React from 'react';
import { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { Field, WrappedFieldInputProps, WrappedFieldProps } from 'redux-form';
import * as styles from './card-number.scss';
import { Input } from '../../../input';
import { CardTypeIcon } from './card-type-icon';
import { IconType } from 'checkout/components';
import { cardNumberFormatter } from '../format';
import { State } from 'checkout/state';
import { get } from 'lodash';

const CustomInput: React.SFC<WrappedFieldInputProps & WrappedFieldProps> = (props) => (
    <Input
        onChange={(e: ChangeEvent<HTMLInputElement>) => props.input.onChange((e.target.value))}
        currentValue={props.value}
        formatter={cardNumberFormatter}
        className={styles.cardNumberInput}
        icon={IconType.card}
        placeholder='Номер на карте'
    />
);

export interface CardNumberDefProps {
    cardNumber: string;
}

const mapStateToProps = (state: State) => ({
    cardNumber: get(state, 'forms.cardForm.values.cardNumber')
});

const CardNumberDef: React.SFC<CardNumberDefProps> = (props) => (
    <div className={styles.inputContainer}>
        <Field name='cardNumber' component={CustomInput}/>
        <CardTypeIcon cardNumber={props.cardNumber}/>
    </div>
);

export const CardNumber = connect(mapStateToProps)(CardNumberDef);
