import * as React from 'react';
import { connect } from 'react-redux';
import { Field, WrappedFieldInputProps, WrappedFieldProps } from 'redux-form';
import { IconType } from 'checkout/components';
import { State } from 'checkout/state';
import { Input } from '../../../input';
import { validateExpireDate } from './validate-expire-date';
import { Locale } from 'checkout/locale';
import { isError } from '../../../common-fields/error-predicate';
import { formatExpiry } from './format-expiry';

type FieldProps = any;

export interface ExpireDateDefProps {
    locale: Locale;
}

const mapStateToProps = (state: State) => ({
    locale: state.config.locale
});

const CustomInput: React.SFC<FieldProps & ExpireDateDefProps> = (props) => (
    <Input
        {...props.input}
        {...props.meta}
        error={isError(props.meta)}
        icon={IconType.calendar}
        placeholder={props.locale['form.input.expiry.placeholder']}
        mark={true}
        type='tel'
        id='expire-date-input'
        onInput={formatExpiry}
    />
);

export const ExpireDateDef: React.SFC<ExpireDateDefProps> = (props) => (
    <Field
        name='expireDate'
        component={(fieldProps: FieldProps) => CustomInput({...fieldProps, ...props})}
        validate={validateExpireDate}
    />
);

export const ExpireDate = connect(mapStateToProps)(ExpireDateDef);
