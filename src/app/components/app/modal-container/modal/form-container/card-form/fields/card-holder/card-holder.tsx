import * as React from 'react';
import { Field, WrappedFieldInputProps, WrappedFieldProps } from 'redux-form';
import { Input } from '../../../input';
import { IconType } from 'checkout/components/ui';
import { cardHolderFormatter } from '../format';
import { validateCardHolder } from '../validation';

const CustomInput: React.SFC<WrappedFieldInputProps & WrappedFieldProps> = (props) => (
    <Input
        {...props.input}
        error={props.meta.touched ? props.meta.error : false}
        formatter={cardHolderFormatter}
        icon={IconType.user}
        placeholder='Имя на карте'
        mark={true}
    />
);

export const CardHolder: React.SFC = () => (
    <Field name='cardHolder' component={CustomInput} validate={validateCardHolder}/>
);
