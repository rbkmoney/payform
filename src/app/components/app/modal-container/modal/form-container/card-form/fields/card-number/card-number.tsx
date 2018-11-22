import * as React from 'react';
import { connect } from 'react-redux';
import { Field, WrappedFieldProps } from 'redux-form';
import * as styles from './card-number.scss';
import { State } from 'checkout/state';
import { CardTypeIcon } from './card-type-icon';
import { validateCardNumber } from './validate-card-number';
import { IconType, Input } from 'checkout/components';
import { isError } from '../../../common-fields/error-predicate';
import { Locale } from 'checkout/locale';
import { formatCardNumber } from './format-card-number';

export interface CardNumberProps {
    locale: Locale;
}

const getCustomInput = (props: CardNumberProps, fieldProps: WrappedFieldProps) => (
    <Input
        {...fieldProps.input}
        {...fieldProps.meta}
        error={isError(fieldProps.meta)}
        className={styles.cardNumberInput}
        icon={IconType.card}
        placeholder={props.locale['form.input.card.placeholder']}
        mark={true}
        type="tel"
        id="card-number-input"
        onInput={formatCardNumber}
    />
);

const CardNumberDef: React.FC<CardNumberProps> = (props) => (
    <div className={styles.inputContainer}>
        <Field name="cardNumber" component={getCustomInput.bind(null, props)} validate={validateCardNumber} />
        <CardTypeIcon />
    </div>
);

const mapStateToProps = (state: State) => ({
    locale: state.config.locale
});

export const CardNumber = connect(mapStateToProps)(CardNumberDef);
