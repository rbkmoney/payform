import * as React from 'react';
import { ChangeEvent } from 'react';
import { Field, WrappedFieldInputProps, WrappedFieldProps } from 'redux-form';
import { Input } from '../../../input';
import { IconType } from 'checkout/components/ui';
import { cardHolderFormatter } from '../format';

const CustomInput: React.SFC<WrappedFieldInputProps & WrappedFieldProps> = (props) => (
    <Input onChange={(e: ChangeEvent<HTMLInputElement>) => props.input.onChange((e.target.value))}
           currentValue={props.value}
           formatter={cardHolderFormatter}
           icon={IconType.user}
           placeholder='Имя на карте'
    />
);

export const CardHolder: React.SFC = () => (
    <Field name='cardHolder' component={CustomInput}/>
);
