import * as React from 'react';
import { connect } from 'react-redux';
import { Field, WrappedFieldInputProps, WrappedFieldProps } from 'redux-form';
import { IconType, Input } from 'checkout/components';
import { CardFormFlowItem, State } from 'checkout/state';
import { InvoiceTemplateLineCostRange, InvoiceTemplateLineCostUnlim } from 'checkout/backend';
import { getActive } from 'checkout/components/app/form-flow-manager';
import { getPlaceholder } from './get-placeholder';
import { validate } from './validate';
import { Locale } from 'checkout/locale';

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
        error={!props.meta.pristine ? props.meta.error : false}
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
