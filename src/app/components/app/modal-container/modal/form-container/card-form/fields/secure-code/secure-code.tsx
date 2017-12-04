import * as React from 'react';
import { Field } from 'redux-form';
import { Input } from '../../../input';
import { IconType } from 'checkout/components';
import { secureCodeFormatter } from '../format';

export const SecureCode: React.SFC = (props) =>
    (
        <Field
            name='secureCode'
            component={(data: any) => {
                return <Input onChange={(e: any) => data.input.onChange(e.target.value)}
                              currentValue={data.value}
                              formatter={secureCodeFormatter}
                              icon={IconType.lock}
                              placeholder='CVV/CVC'
                />;
            }}
        />
    );
