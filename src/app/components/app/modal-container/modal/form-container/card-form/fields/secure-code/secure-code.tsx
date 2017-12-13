import * as React from 'react';
import { Field, WrappedFieldInputProps, WrappedFieldProps } from 'redux-form';
import { Input } from '../../../input';
import { IconType } from 'checkout/components';
import { secureCodeFormatter } from '../format';
import { validateSecureCode } from '../validation';
import { isError } from '../error-predicate';

const CustomInput: React.SFC<WrappedFieldInputProps & WrappedFieldProps> = (props) => (
    <Input
        {...props.input}
        {...props.meta}
        error={isError(props.meta)}
        formatter={secureCodeFormatter}
        icon={IconType.lock}
        placeholder='CVV/CVC'
        mark={true}
    />
);

export const SecureCode: React.SFC = (props) => (
    <Field name='secureCode' component={CustomInput} validate={validateSecureCode}/>
);
