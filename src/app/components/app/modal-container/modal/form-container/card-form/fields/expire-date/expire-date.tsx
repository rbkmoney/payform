import * as React from 'react';
import { ChangeEvent } from 'react';
import { Field } from 'redux-form';
import { Input } from '../../../input';
import { IconType } from 'checkout/components';
import { expireDateFormatter } from '../format';

export const ExpireDate: React.SFC = (props) => (
    <Field name='expireDate'
           component={(data: any) => (
               <Input onChange={(e: ChangeEvent<HTMLInputElement>) => data.input.onChange((e.target.value))}
                      currentValue={data.value}
                      formatter={expireDateFormatter}
                      icon={IconType.calendar}
                      placeholder='ММ/ГГ'
               />)}
    />
);
