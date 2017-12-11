import * as React from 'react';
import { Field, WrappedFieldInputProps, WrappedFieldProps } from 'redux-form';
import { Input } from '../../../input';
import { IconType } from 'checkout/components';
import { expireDateFormatter } from '../format';
import { validateExpireDate } from '../validation';

const CustomInput: React.SFC<WrappedFieldInputProps & WrappedFieldProps> = (props) => (
    <Input
        {...props.input}
        {...props.meta}
        error={!props.meta.pristine ? props.meta.error : false}
        formatter={expireDateFormatter}
        icon={IconType.calendar}
        placeholder='ММ/ГГ'
        mark={true}
    />
);

export const ExpireDate: React.SFC = (props) => (
    <Field name='expireDate' component={CustomInput} validate={validateExpireDate}/>
);
