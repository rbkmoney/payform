import * as React from 'react';
import { connect } from 'react-redux';
import { Field, WrappedFieldInputProps, WrappedFieldProps } from 'redux-form';
import { IconType, Input } from 'checkout/components';
import { CardFormInfo, FormName, ModalForms, ModalName, ModalState, State } from 'checkout/state';
import { InvoiceTemplateLineCostRange, InvoiceTemplateLineCostUnlim } from 'checkout/backend';
import { getPlaceholder } from './get-placeholder';
import { validate } from './validate';
import { isError } from '../../card-form/fields/error-predicate';
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
        validate={(value) => validate(value, props)}
    />
);

const toCost = (s: ModalState[]) => {
    const modalForms = s.find((modal) => modal.name === ModalName.modalForms) as ModalForms;
    const cardFormInfo = modalForms.formsInfo.find((info) => info.name === FormName.cardForm) as CardFormInfo;
    return cardFormInfo.fieldsConfig.amount.cost;
};

const mapStateToProps = (state: State) => ({
        cost: toCost(state.modals),
        locale: state.config.locale
    }
);

export const Amount = connect(mapStateToProps)(AmountDef);
