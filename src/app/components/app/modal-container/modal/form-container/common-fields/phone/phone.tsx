import * as React from 'react';
import { connect } from 'react-redux';
import { Field, WrappedFieldProps } from 'redux-form';

import { State } from 'checkout/state';
import { Input } from '../../input';
import { Locale } from 'checkout/locale';
import { isError } from '../error-predicate';
import { validatePhone } from './validate-phone';
import { formatPhoneNumber } from './format-phone-number';
import { Phone as PhoneIcon } from 'checkout/components';

export interface PhoneProps {
    locale: Locale;
}

const getCustomInput = (props: PhoneProps, fieldProps: WrappedFieldProps) => (
    <Input
        {...fieldProps.input}
        {...fieldProps.meta}
        error={isError(fieldProps.meta)}
        icon={<PhoneIcon />}
        placeholder={props.locale['form.input.phone.placeholder']}
        mark={true}
        type="tel"
        id="phone-input"
        onInput={formatPhoneNumber}
        onFocus={formatPhoneNumber}
        autocomplete="tel"
    />
);

export const PhoneDef: React.FC<PhoneProps> = (props) => (
    <Field name="phone" component={getCustomInput.bind(null, props)} validate={validatePhone} />
);

const mapStateToProps = (state: State) => ({
    locale: state.config.locale
});

export const Phone = connect(mapStateToProps)(PhoneDef);
