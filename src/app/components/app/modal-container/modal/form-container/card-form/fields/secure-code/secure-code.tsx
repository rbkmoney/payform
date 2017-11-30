import * as React from 'react';
import { Input } from '../../../input';
import { IconType } from 'checkout/components';
import { Formatter } from '../format';

export const SecureCode: React.SFC = (props) =>
    (
        <Input formatter={Formatter.formatSecureCode} icon={IconType.lock} placeholder='CVV/CVC' type='password'/>
    );
