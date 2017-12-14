import * as React from 'react';
import { connect } from 'react-redux';
import { Field, formValueSelector, WrappedFieldInputProps, WrappedFieldProps } from 'redux-form';
import * as styles from './card-number.scss';
import { Input } from '../../../input';
import { CardTypeIcon } from './card-type-icon';
import { IconType } from 'checkout/components';
import { cardNumberFormatter } from '../format';
import { FormName, State } from 'checkout/state';
import { validateCardNumber } from '../validation';
import { isError } from '../error-predicate';

const CustomInput: React.SFC<WrappedFieldInputProps & WrappedFieldProps> = (props) => (
    <Input
        {...props.input}
        {...props.meta}
        error={isError(props.meta)}
        formatter={cardNumberFormatter}
        className={styles.cardNumberInput}
        icon={IconType.card}
        placeholder='Номер на карте'
        mark={true}
    />);

export interface CardNumberDefProps {
    cardNumber: string;
}

const selector = formValueSelector(FormName.cardForm);

const mapStateToProps = (state: State) => ({
    cardNumber: selector(state, 'cardNumber')
});

const CardNumberDef: React.SFC<CardNumberDefProps> = (props) => (
    <div className={styles.inputContainer}>
        <Field name='cardNumber' component={CustomInput} validate={validateCardNumber}/>
        <CardTypeIcon cardNumber={props.cardNumber}/>
    </div>
);

export const CardNumber = connect(mapStateToProps)(CardNumberDef);
