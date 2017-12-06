import * as React from 'react';
import { ChangeEvent } from 'react';
import { Field, WrappedFieldInputProps, WrappedFieldProps } from 'redux-form';
import { Input } from '../../../input';
import { IconType } from 'checkout/components/ui';

const CustomInput: React.SFC<WrappedFieldInputProps & WrappedFieldProps> = (data) => (
    <Input onChange={(e: ChangeEvent<HTMLInputElement>) => data.input.onChange((e.target.value))}
           currentValue={data.value}
           icon={IconType.letter}
           placeholder='Email для чека'
    />
);

export const Email: React.SFC = (props) => (
    <Field name='email' component={CustomInput}/>
);
