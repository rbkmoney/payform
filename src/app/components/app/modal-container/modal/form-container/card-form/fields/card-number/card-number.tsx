import * as React from 'react';
import { connect } from 'react-redux';
import { Field, formValueSelector, WrappedFieldInputProps, WrappedFieldProps } from 'redux-form';
import * as styles from './card-number.scss';
import { IconType } from 'checkout/components';
import { FormName, State } from 'checkout/state';
import { Input } from '../../../input';
import { CardTypeIcon } from './card-type-icon';
import { cardNumberFormatter } from '../format';
import { validateCardNumber } from '../validation';

export interface CardNumberDefProps {
    cardNumber: string;
    locale: any;
}

type FieldProps = WrappedFieldInputProps & WrappedFieldProps;

const CustomInput: React.SFC<FieldProps & CardNumberDefProps> = (props) => (
    <Input
        {...props.input}
        {...props.meta}
        error={!props.meta.pristine ? props.meta.error : false}
        formatter={cardNumberFormatter}
        className={styles.cardNumberInput}
        icon={IconType.card}
        placeholder={props.locale['form.input.card.placeholder']}
    />
);

const CardNumberDef: React.SFC<CardNumberDefProps> = (props) => (
    <div className={styles.inputContainer}>
        <Field
            name='cardNumber'
            component={(fieldProps: FieldProps) => CustomInput({...fieldProps, ...props})}
            validate={validateCardNumber}
        />
        <CardTypeIcon cardNumber={props.cardNumber}/>
    </div>
);

const selector = formValueSelector(FormName.cardForm);

const mapStateToProps = (state: State) => ({
    cardNumber: selector(state, 'cardNumber'),
    locale: state.config.locale
});

export const CardNumber = connect(mapStateToProps)(CardNumberDef);
