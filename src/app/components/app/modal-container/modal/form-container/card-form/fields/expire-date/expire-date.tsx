import * as React from 'react';
import { Input } from '../../../input';
import { IconType } from 'checkout/components';
import { expireDateFormatter } from '../format';

export const ExpireDate: React.SFC = (props) =>
    (
        <Input formatter={expireDateFormatter} icon={IconType.calendar} placeholder='ММ/ГГ'/>
    );
