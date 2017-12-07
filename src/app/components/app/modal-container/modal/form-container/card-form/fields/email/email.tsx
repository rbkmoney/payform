import * as React from 'react';
import { ChangeEvent } from 'react';
import { Field, WrappedFieldInputProps, WrappedFieldProps } from 'redux-form';
import { Input } from '../../../input';
import { IconType } from 'checkout/components/ui';

const CustomInput: React.SFC<WrappedFieldInputProps & WrappedFieldProps> = (props) => (
    <Input
        error={props.meta.error}
        onChange={(e: ChangeEvent<HTMLInputElement>) => props.input.onChange((e.target.value))}
        currentValue={props.value}
        icon={IconType.letter}
        placeholder='Email для чека'
    />
);

export const Email: React.SFC = (props) => (
    <Field name='email' component={CustomInput}/>
);
