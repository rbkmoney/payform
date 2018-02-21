import * as React from 'react';
import { connect } from 'react-redux';
import { Field, WrappedFieldProps } from 'redux-form';
import { Input } from '../../../input';
import { IconType } from 'checkout/components';
import { validateSecureCode } from './validate-secure-code';
import { State } from 'checkout/state';
import { Locale } from 'checkout/locale';
import { isError } from '../../../common-fields/error-predicate';
import { formatCVC } from './format-cvc';

export interface SecureCodeProps {
    locale: Locale;
    obscureCardCvv: boolean;
}

const getCustomInput = (props: SecureCodeProps, fieldProps: WrappedFieldProps) => (
    <Input
        {...fieldProps.input}
        {...fieldProps.meta}
        error={isError(fieldProps.meta)}
        icon={IconType.lock}
        placeholder={props.locale['form.input.secure.placeholder']}
        mark={true}
        type={props.obscureCardCvv ? 'password' : 'tel'}
        id='secure-code-input'
        onInput={formatCVC}
    />
);

export const SecureCodeDef: React.SFC<SecureCodeProps> = (props) => (
    <Field
        name='secureCode'
        component={getCustomInput.bind(null, props)}
        validate={validateSecureCode}
    />
);

const mapStateToProps = (state: State) => ({
    locale: state.config.locale,
    obscureCardCvv: state.config.initConfig.obscureCardCvv
});

export const SecureCode = connect(mapStateToProps)(SecureCodeDef);
