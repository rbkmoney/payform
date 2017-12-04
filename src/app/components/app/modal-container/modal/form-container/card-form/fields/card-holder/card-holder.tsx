import * as React from 'react';
import { Field } from 'redux-form';
import { Input } from '../../../input';
import { IconType } from 'checkout/components/ui';
import { cardHolderFormatter } from '../format';
import { ChangeEvent } from 'react';

export const CardHolder: React.SFC = (props) =>
    (
        <Field name='cardHolder'
               component={(data: any) => (
                   <Input onChange={(e: ChangeEvent<HTMLInputElement>) => data.input.onChange((e.target as HTMLInputElement).value)}
                          currentValue={data.value}
                          formatter={cardHolderFormatter}
                          icon={IconType.user}
                          placeholder='Имя на карте'
                   />)}
        />
    );
