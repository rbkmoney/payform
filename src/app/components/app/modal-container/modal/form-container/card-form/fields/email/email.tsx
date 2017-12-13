import * as React from 'react';
import { Field, WrappedFieldInputProps, WrappedFieldProps } from 'redux-form';
import { Input } from '../../../input';
import { IconType } from 'checkout/components/ui';
import { validateEmail } from '../validation';
import { isError } from '../error-predicate';

const CustomInput: React.SFC<WrappedFieldInputProps & WrappedFieldProps> = (props) => (
    <Input
        {...props.input}
        {...props.meta}
        error={isError(props.meta)}
        icon={IconType.letter}
        placeholder='Email для чека'
        mark={true}
    />
);

export const Email: React.SFC = (props) => (
    <Field name='email' component={CustomInput} validate={validateEmail}/>
);
