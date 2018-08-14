import * as React from 'react';
import { connect } from 'react-redux';
import { Field, WrappedFieldProps } from 'redux-form';
import { IconType, Input } from 'checkout/components';
import { getPlaceholder } from './get-placeholder';
import { validateAmount } from './validate-amount';
import { isError } from '../error-predicate';
import { Locale } from 'checkout/locale';
import { InvoiceTemplateLineCostRange, InvoiceTemplateLineCostUnlim } from 'checkout/backend';
import { State } from 'checkout/state';
import { formatAmount } from './format-amount';

interface OwnProps {
    cost: InvoiceTemplateLineCostRange | InvoiceTemplateLineCostUnlim;
}

export interface AmountProps {
    cost: InvoiceTemplateLineCostRange | InvoiceTemplateLineCostUnlim;
    locale: Locale;
}

const getCustomInput = (props: AmountProps, fieldProps: WrappedFieldProps) => (
    <Input
        {...fieldProps.input}
        {...fieldProps.meta}
        icon={IconType.amount}
        error={isError(fieldProps.meta)}
        placeholder={getPlaceholder(props.cost, props.locale['form.input.amount.placeholder'])}
        mark={true}
        type="tel"
        id="amount-input"
        onInput={formatAmount}
    />
);

const AmountDef: React.SFC<AmountProps> = (props) => (
    <Field
        name="amount"
        component={getCustomInput.bind(null, props)}
        validate={(value) => validateAmount(value, props.cost)}
    />
);

const mapStateToProps = (state: State, ownProps: OwnProps) => ({
    cost: ownProps.cost,
    locale: state.config.locale
});

export const Amount = connect(mapStateToProps)(AmountDef);
