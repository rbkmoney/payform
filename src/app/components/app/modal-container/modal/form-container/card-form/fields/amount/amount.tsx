import * as React from 'react';
import { connect } from 'react-redux';
import { Field, WrappedFieldInputProps, WrappedFieldProps } from 'redux-form';
import { Input } from 'checkout/components';
import { ChangeEvent } from 'react';
import { State, CardFormFlowItem } from 'checkout/state';
import { InvoiceTemplateLineCostRange, InvoiceTemplateLineCostUnlim } from 'checkout/backend';
import { getActive } from 'checkout/components/app/form-flow-manager';
import { getPlaceholder } from './get-placeholder';

export interface AmountProps {
    cost: InvoiceTemplateLineCostRange | InvoiceTemplateLineCostUnlim;
}

type FieldProps = WrappedFieldInputProps & WrappedFieldProps;

const CustomInput: React.SFC<FieldProps & AmountProps> = (props) => (
    <Input onChange={(e: ChangeEvent<HTMLInputElement>) => props.input.onChange((e.target.value))}
           currentValue={props.value}
           placeholder={getPlaceholder(props.cost)}
           type={'number'}
    />
);

const AmountDef: React.SFC<AmountProps> = (props) => (
    <Field name='amount' component={
        (fieldProps: FieldProps) => CustomInput({...fieldProps, ...props})
    }/>
);

const mapStateToProps = (state: State) => ({
    cost: (getActive(state.formsFlow) as CardFormFlowItem).amountConfig.cost
});

export const Amount = connect(mapStateToProps)(AmountDef);
