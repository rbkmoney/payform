import * as React from 'react';
import { connect } from 'react-redux';
import { Field, WrappedFieldProps } from 'redux-form';

import { State } from 'checkout/state';
import { CardTypeIcon } from './card-type-icon';
import { validateCardNumber } from './validate-card-number';
import { Card, Input } from 'checkout/components';
import { isError } from '../../../common-fields/error-predicate';
import { Locale } from 'checkout/locale';
import { formatCardNumber } from './format-card-number';
import styled from 'checkout/styled-components';

const InputContainer = styled.div`
    width: 100%;
    position: relative;
`;

const CardNumberInput = styled(Input)`
    input {
        padding-right: 50px !important;
    }
`;

export interface CardNumberProps {
    locale: Locale;
}

const getCardNumberInput = (props: CardNumberProps, fieldProps: WrappedFieldProps) => (
    <CardNumberInput
        {...fieldProps.input}
        {...fieldProps.meta}
        error={isError(fieldProps.meta)}
        icon={<Card />}
        placeholder={props.locale['form.input.card.placeholder']}
        mark={true}
        type="tel"
        id="card-number-input"
        onInput={formatCardNumber}
        autocomplete="cc-number"
    />
);

const CardNumberDef: React.FC<CardNumberProps> = (props) => (
    <InputContainer>
        <Field name="cardNumber" component={getCardNumberInput.bind(null, props)} validate={validateCardNumber} />
        <CardTypeIcon />
    </InputContainer>
);

const mapStateToProps = (state: State) => ({
    locale: state.config.locale
});

export const CardNumber = connect(mapStateToProps)(CardNumberDef);
