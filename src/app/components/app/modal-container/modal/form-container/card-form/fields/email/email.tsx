import * as React from 'react';
import { Field } from 'redux-form';
import { Input } from '../../../input';
import { IconType } from 'checkout/components/ui';
import { ChangeEvent } from 'react';

export const Email: React.SFC = (props) =>
    (
        <Field name='email'
               component={(data: any) => (
                   <Input onChange={(e: ChangeEvent<HTMLInputElement>) => data.input.onChange((e.target as HTMLInputElement).value)}
                          currentValue={data.value}
                          icon={IconType.letter}
                          placeholder='Email для чека'
                   />)}
        />
    );
