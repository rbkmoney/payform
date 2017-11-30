import * as React from 'react';
import { Input } from '../../../input';
import { IconType } from 'checkout/components';
import { secureCodeFormatter } from '../format';

export const SecureCode: React.SFC = (props) =>
    (
        <Input formatter={secureCodeFormatter} icon={IconType.lock} placeholder='CVV/CVC' type='password'/>
    );
