import * as React from 'react';
import { connect } from 'react-redux';
import { Field, WrappedFieldInputProps, WrappedFieldProps } from 'redux-form';
import { IconType } from 'checkout/components/ui';
import { State } from 'checkout/state';
import { Input } from '../../../input';
import { cardHolderFormatter } from '../format';
import { validateCardHolder } from '../validation';
import { Locale } from 'checkout/locale';
import { isError } from '../../../common-fields/error-predicate';

type FieldProps = WrappedFieldInputProps & WrappedFieldProps;

export interface CardHolderDefProps {
    locale: Locale;
}

const mapStateToProps = (state: State) => ({
    locale: state.config.locale
});

const CustomInput: React.SFC<FieldProps & CardHolderDefProps> = (props) => (
    <Input
        {...props.input}
        {...props.meta}
        error={isError(props.meta)}
        formatter={cardHolderFormatter}
        icon={IconType.user}
        placeholder={props.locale['form.input.cardholder.placeholder']}
        mark={true}
        id='card-holder-input'
    />
);

export const CardHolderDef: React.SFC<CardHolderDefProps> = (props) => (
    <Field
        name='cardHolder'
        component={(fieldProps: FieldProps) => CustomInput({...fieldProps, ...props})}
        validate={validateCardHolder}
    />
);

export const CardHolder = connect(mapStateToProps)(CardHolderDef);
