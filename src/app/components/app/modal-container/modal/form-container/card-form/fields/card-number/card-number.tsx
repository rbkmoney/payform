import * as React from 'react';
import { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import * as styles from './card-number.scss';
import { Input } from '../../../input';
import { CardTypeIcon } from './card-type-icon';
import { IconType } from 'checkout/components';
import { cardNumberFormatter } from '../format';
import { FormsState, State } from 'checkout/state';

const renderInput: React.SFC = (data: any) => {
    return (
        <Input
            onChange={(e: ChangeEvent<HTMLInputElement>) => data.input.onChange((e.target as HTMLInputElement).value)}
            currentValue={data.value}
            formatter={cardNumberFormatter}
            className={styles.cardNumberInput}
            icon={IconType.card}
            placeholder='Номер на карте'
        />
    );
};

interface CardNumberDefProps {
    forms: FormsState;
}

const CardNumberDef: React.SFC<CardNumberDefProps> = (props) => {
    const cardForm = props.forms.cardForm;
    const cardNumber = cardForm
        && cardForm.values
        && cardForm.values.cardNumber ? cardForm.values.cardNumber : null;
    return <div className={styles.inputContainer}>
        <Field name='cardNumber'
               component={renderInput}
        />
        <CardTypeIcon cardNumber={cardNumber}/>
    </div>;
};

function mapStateToProps(state: State) {
    return {
        forms: state.forms
    };
}

export const CardNumber = connect(mapStateToProps)(CardNumberDef);
