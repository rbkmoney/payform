import * as React from 'react';
import { connect } from 'react-redux';
import { Field, WrappedFieldInputProps, WrappedFieldProps } from 'redux-form';
import { IconType, Input } from 'checkout/components';
import { getPlaceholder } from './get-placeholder';
import { validate } from './validate';
import { isError } from '../error-predicate';
import { Locale } from 'checkout/locale';
import { InvoiceTemplateLineCostRange, InvoiceTemplateLineCostUnlim } from 'checkout/backend';
import { State } from 'checkout/state';

type FieldProps = WrappedFieldInputProps & WrappedFieldProps;

interface OwnProps {
    cost: InvoiceTemplateLineCostRange | InvoiceTemplateLineCostUnlim;
}

export interface AmountProps {
    cost: InvoiceTemplateLineCostRange | InvoiceTemplateLineCostUnlim;
    locale: Locale;
}

const mapStateToProps = (state: State, ownProps: OwnProps) => ({
    cost: ownProps.cost,
    locale: state.config.locale
});

const CustomInput: React.SFC<FieldProps & AmountProps> = (props) => (
    <Input
        {...props.input}
        {...props.meta}
        icon={IconType.amount}
        error={isError(props.meta)}
        placeholder={getPlaceholder(props.cost, props.locale['form.input.amount.placeholder'])}
        mark={true}
        type='tel'
        id='amount-input'
    />
);

const AmountDef: React.SFC<AmountProps> = (props) => (
    <Field
        name='amount'
        component={(fieldProps: FieldProps) => CustomInput({...fieldProps, ...props})}
        validate={(value) => validate(value, props.cost)}
    />
);

export const Amount = connect(mapStateToProps)(AmountDef);
