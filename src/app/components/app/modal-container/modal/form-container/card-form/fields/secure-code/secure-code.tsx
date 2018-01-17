import * as React from 'react';
import { connect } from 'react-redux';
import { Field, WrappedFieldInputProps, WrappedFieldProps } from 'redux-form';
import { Input } from '../../../input';
import { IconType } from 'checkout/components';
import { secureCodeFormatter } from '../format';
import { validateSecureCode } from '../validation';
import { State } from 'checkout/state';
import { Locale } from 'checkout/locale';
import { isError } from '../error-predicate';

type FieldProps = WrappedFieldInputProps & WrappedFieldProps;

export interface SecureCodeDefProps {
    locale: Locale;
}

const mapStateToProps = (state: State) => ({
    locale: state.config.locale
});

const CustomInput: React.SFC<FieldProps & SecureCodeDefProps> = (props) => (
    <Input
        {...props.input}
        {...props.meta}
        error={isError(props.meta)}
        formatter={secureCodeFormatter}
        icon={IconType.lock}
        placeholder={props.locale['form.input.secure.placeholder']}
        mark={true}
        type='tel'
        id='secure-code-input'
    />
);

export const SecureCodeDef: React.SFC<SecureCodeDefProps> = (props) => (
    <Field name='secureCode' component={(fieldProps: FieldProps) => CustomInput({...fieldProps, ...props})}
           validate={validateSecureCode}/>
);

export const SecureCode = connect(mapStateToProps)(SecureCodeDef);
