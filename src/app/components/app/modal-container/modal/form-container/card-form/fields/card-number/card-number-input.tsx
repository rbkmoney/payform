import * as React from 'react';
import { connect } from 'react-redux';
import { WrappedFieldInputProps, WrappedFieldProps } from 'redux-form';
import * as styles from './card-number.scss';
import { cardNumberFormatter } from '../format/index';
import { Locale } from 'src/locale/locale';
import { State } from 'checkout/state';
import { isError } from '../../../common-fields/error-predicate';
import { IconType, Input } from 'checkout/components';

type FieldProps = WrappedFieldInputProps & WrappedFieldProps;

interface CardNumberInputProps {
    locale: Locale;
}

const CardNumberInputDef: React.SFC<FieldProps & CardNumberInputProps> = (props) => (
    <Input
        {...props.input}
        {...props.meta}
        error={isError(props.meta)}
        formatter={cardNumberFormatter}
        className={styles.cardNumberInput}
        icon={IconType.card}
        placeholder={props.locale['form.input.card.placeholder']}
        mark={true}
        type='tel'
        id='card-number-input'
    />
);

const mapStateToProps = (state: State) => ({
    locale: state.config.locale
});

export const CardNumberInput = connect(mapStateToProps)(CardNumberInputDef);
