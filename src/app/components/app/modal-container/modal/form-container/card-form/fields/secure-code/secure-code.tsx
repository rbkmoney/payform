import * as React from 'react';
import { ChangeEvent } from 'react';
import { Field, WrappedFieldInputProps, WrappedFieldProps } from 'redux-form';
import { Input } from '../../../input';
import { IconType } from 'checkout/components';
import { secureCodeFormatter } from '../format';

const CustomInput: React.SFC<WrappedFieldInputProps & WrappedFieldProps> = (props) => (
    <Input
        error={props.meta.error}
        onChange={(e: ChangeEvent<HTMLInputElement>) => props.input.onChange((e.target.value))}
        currentValue={props.value}
        formatter={secureCodeFormatter}
        icon={IconType.lock}
        placeholder='CVV/CVC'
    />
);

export const SecureCode: React.SFC = (props) => (
    <Field name='secureCode' component={CustomInput}/>
);
