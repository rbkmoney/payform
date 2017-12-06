import * as React from 'react';
import { ChangeEvent } from 'react';
import { Field, WrappedFieldInputProps, WrappedFieldProps } from 'redux-form';
import { Input } from '../../../input';
import { IconType } from 'checkout/components';
import { expireDateFormatter } from '../format';

const CustomInput: React.SFC<WrappedFieldInputProps & WrappedFieldProps> = (data) => (
    <Input onChange={(e: ChangeEvent<HTMLInputElement>) => data.input.onChange((e.target.value))}
           currentValue={data.value}
           formatter={expireDateFormatter}
           icon={IconType.calendar}
           placeholder='ММ/ГГ'
    />
);

export const ExpireDate: React.SFC = (props) => (
    <Field name='expireDate' component={CustomInput}/>
);
