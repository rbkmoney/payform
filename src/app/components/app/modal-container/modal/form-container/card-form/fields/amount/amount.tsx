import * as React from 'react';
import { connect } from 'react-redux';
import { Field, WrappedFieldInputProps, WrappedFieldProps } from 'redux-form';
import { IconType, Input } from 'checkout/components';
import { State } from 'checkout/state';
import { InvoiceTemplateLineCostRange, InvoiceTemplateLineCostUnlim } from 'checkout/backend';
import { getPlaceholder } from './get-placeholder';
import { validate } from './validate';
import { isError } from '../error-predicate';
import { Locale } from 'checkout/locale';
import { CardFormFlowItem, getActive } from 'checkout/form-flow';

export interface AmountProps {
    cost: InvoiceTemplateLineCostRange | InvoiceTemplateLineCostUnlim;
    locale: Locale;
}

type FieldProps = WrappedFieldInputProps & WrappedFieldProps;

const CustomInput: React.SFC<FieldProps & AmountProps> = (props) => (
    <Input
        {...props.input}
        {...props.meta}
        icon={IconType.amount}
        error={isError(props.meta)}
        placeholder={getPlaceholder(props.cost, props.locale['form.input.amount.placeholder'])}
        type={'number'}
        mark={true}
    />
);

const AmountDef: React.SFC<AmountProps> = (props) => (
    <Field
        name='amount'
        component={(fieldProps: FieldProps) => CustomInput({...fieldProps, ...props})}
        validate={(value) => validate(value, props)}
    />
);

const mapStateToProps = (state: State) => ({
    cost: (getActive(state.formsFlow) as CardFormFlowItem).amountConfig.cost,
    locale: state.config.locale
});

export const Amount = connect(mapStateToProps)(AmountDef);
