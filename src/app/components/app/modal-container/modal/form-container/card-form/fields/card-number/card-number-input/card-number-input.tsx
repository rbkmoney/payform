import * as React from 'react';
import { connect } from 'react-redux';
import { WrappedFieldInputProps, WrappedFieldProps } from 'redux-form';
import { IconType, Input } from 'checkout/components';
import { State } from 'checkout/state';
import * as styles from '../card-number.scss';
import { cardNumberFormatter } from '../../format';
import { Locale } from 'checkout/locale';

type FieldProps = WrappedFieldInputProps & WrappedFieldProps;

interface CardNumberInputProps {
    locale: Locale;
}

const CardNumberInputDef: React.SFC<FieldProps & CardNumberInputProps> = (props) => (
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

const mapStateToProps = (state: State) => ({
    locale: state.config.locale
});

export const CardNumberInput = connect(mapStateToProps)(CardNumberInputDef);
