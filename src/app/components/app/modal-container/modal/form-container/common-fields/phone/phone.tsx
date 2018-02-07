import * as React from 'react';
import { connect } from 'react-redux';
import { Field, WrappedFieldInputProps, WrappedFieldProps } from 'redux-form';
import { IconType } from 'checkout/components/ui';
import { State } from 'checkout/state';
import { Input } from '../../input';
import { Locale } from 'checkout/locale';
import { isError } from '../error-predicate';
import { validatePhone } from '../validation/phone';
import { phoneNumberFormatter } from '../format';

// type FieldProps = WrappedFieldInputProps & WrappedFieldProps;
type FieldProps = any;

export interface PhoneDefProps {
    locale: Locale;
}

const mapStateToProps = (state: State) => ({
    locale: state.config.locale
});

const CustomInput: React.SFC<FieldProps & PhoneDefProps> = (props) => (
    <Input
        {...props.input}
        {...props.meta}
        error={isError(props.meta)}
        formatter={phoneNumberFormatter}
        icon={IconType.phone}
        placeholder={props.locale['form.input.phone.placeholder']}
        mark={true}
        type='tel'
        id='phone-input'
    />
);

export const PhoneDef: React.SFC<PhoneDefProps> = (props) => (
    <Field
        name='phone'
        component={(fieldProps: FieldProps) => CustomInput({...fieldProps, ...props})}
        validate={validatePhone}
    />
);

export const Phone = connect(mapStateToProps)(PhoneDef);
