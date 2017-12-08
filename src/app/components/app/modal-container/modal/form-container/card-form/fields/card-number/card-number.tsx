import * as React from 'react';
import { connect } from 'react-redux';
import { Field, WrappedFieldInputProps, WrappedFieldProps } from 'redux-form';
import * as styles from './card-number.scss';
import { Input } from '../../../input';
import { CardTypeIcon } from './card-type-icon';
import { IconType } from 'checkout/components';
import { cardNumberFormatter } from '../format';
import { State } from 'checkout/state';
import { get } from 'lodash';
import { validateCardNumber } from '../validation';

const CustomInput: React.SFC<WrappedFieldInputProps & WrappedFieldProps> = (props) => (
    <Input
        {...props.input}
        error={props.meta.touched ? props.meta.error : false}
        formatter={cardNumberFormatter}
        className={styles.cardNumberInput}
        icon={IconType.card}
        placeholder='Номер на карте'
    />);

export interface CardNumberDefProps {
    cardNumber: string;
}

const mapStateToProps = (state: State) => ({
    cardNumber: get(state, 'form.cardForm.values.cardNumber')
});

const CardNumberDef: React.SFC<CardNumberDefProps> = (props) => (
    <div className={styles.inputContainer}>
        <Field name='cardNumber' component={CustomInput} validate={validateCardNumber}/>
        <CardTypeIcon cardNumber={props.cardNumber}/>
    </div>
);

export const CardNumber = connect(mapStateToProps)(CardNumberDef);
