import * as React from 'react';
import { Input } from '../../../input';
import { IconType } from 'checkout/components';
import { Formatter } from '../format';

export const ExpireDate: React.SFC = (props) =>
    (
        <Input formatter={Formatter.formatExpireDate} icon={IconType.calendar} placeholder='ММ/ГГ'/>
    );
