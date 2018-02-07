import * as React from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
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

const CustomInput: React.SFC<any> = (props) => (
    <Input
        {...props.input}
        {...props.meta}
        error={isError(props.meta)}
        className={styles.cardNumberInput}
        icon={IconType.card}
        placeholder={props.locale['form.input.card.placeholder']}
        mark={true}
        type='tel'
        id='card-number-input'
        onInput={formatCardNumber}
    />
);

const CardNumberDef: React.SFC<CardNumberProps> = (props) => {
    return <div className={styles.inputContainer}>
        <Field
            name='cardNumber'
            component={(fieldProps: any) => CustomInput({...fieldProps, ...props})}
            validate={validateCardNumber}
        />
        <CardTypeIcon/>
    </div>;
};

const mapStateToProps = (state: State) => ({
    locale: state.config.locale
});

export const CardNumber = connect(mapStateToProps)(CardNumberDef);
