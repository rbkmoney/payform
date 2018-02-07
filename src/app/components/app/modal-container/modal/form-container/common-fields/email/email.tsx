import * as React from 'react';
import { connect } from 'react-redux';
import { Field, WrappedFieldInputProps, WrappedFieldProps } from 'redux-form';
import { IconType } from 'checkout/components/ui';
import { State } from 'checkout/state';
import { Input } from '../../input';
import { Locale } from 'checkout/locale';
import { isError } from '../error-predicate';
import { validateEmail } from '../validation/email';

// type FieldProps = WrappedFieldInputProps & WrappedFieldProps;
type FieldProps = any;

export interface EmailDefProps {
    locale: Locale;
}

const mapStateToProps = (state: State) => ({
    locale: state.config.locale
});

const CustomInput: React.SFC<FieldProps & EmailDefProps> = (props) => (
    <Input
        {...props.input}
        {...props.meta}
        error={isError(props.meta)}
        icon={IconType.letter}
        placeholder={props.locale['form.input.email.placeholder']}
        mark={true}
        type='email'
        id='email-input'
    />
);

export const EmailDef: React.SFC<EmailDefProps> = (props) => (
    <Field
        name='email'
        component={(fieldProps: FieldProps) => CustomInput({...fieldProps, ...props})}
        validate={validateEmail}
    />
);

export const Email = connect(mapStateToProps)(EmailDef);
