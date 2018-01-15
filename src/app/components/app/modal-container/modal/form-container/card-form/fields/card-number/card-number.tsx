import * as React from 'react';
import { connect } from 'react-redux';
import { Field, formValueSelector } from 'redux-form';
import * as styles from './card-number.scss';
import { FormName, State } from 'checkout/state';
import { CardTypeIcon } from './card-type-icon';
import { validateCardNumber } from '../validation';
import { CardNumberInput } from './card-number-input';

export interface CardNumberProps {
    cardNumber: string;
}

const CardNumberDef: React.SFC<CardNumberProps> = (props) => (
    <div className={styles.inputContainer}>
        <Field
            name='cardNumber'
            component={CardNumberInput}
            validate={validateCardNumber}
        />
        <CardTypeIcon cardNumber={props.cardNumber}/>
    </div>
);

const selector = formValueSelector(FormName.cardForm);

const mapStateToProps = (state: State) => ({
    cardNumber: selector(state, 'cardNumber')
});

export const CardNumber = connect(mapStateToProps)(CardNumberDef);
