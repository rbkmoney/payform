import * as React from 'react';
import { connect } from 'react-redux';
import { Field, WrappedFieldInputProps, WrappedFieldProps } from 'redux-form';
import { IconType } from 'checkout/components/ui';
import { State } from 'checkout/state';
import { Input } from '../../../input';
import { validateCardHolder } from './validate-card-holder';
import { Locale } from 'checkout/locale';
import { isError } from '../../../common-fields/error-predicate';
import { cardHolderUppercase } from './card-holder-uppercase';

// type FieldProps = WrappedFieldInputProps & WrappedFieldProps;
type FieldProps = any;

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
        icon={IconType.user}
        placeholder={props.locale['form.input.cardholder.placeholder']}
        mark={true}
        id='card-holder-input'
        onInput={cardHolderUppercase}
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
