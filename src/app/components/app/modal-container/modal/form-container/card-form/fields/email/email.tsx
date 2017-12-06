import * as React from 'react';
import { ChangeEvent } from 'react';
import { Field } from 'redux-form';
import { Input } from '../../../input';
import { IconType } from 'checkout/components/ui';

export const Email: React.SFC = (props) => (
    <Field name='email'
           component={(data: any) => (
               <Input onChange={(e: ChangeEvent<HTMLInputElement>) => data.input.onChange((e.target.value))}
                      currentValue={data.value}
                      icon={IconType.letter}
                      placeholder='Email для чека'
               />)}
    />
);
