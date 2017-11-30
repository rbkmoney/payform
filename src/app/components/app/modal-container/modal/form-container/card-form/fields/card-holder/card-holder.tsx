import * as React from 'react';
import { Input } from '../../../input';
import { IconType } from 'checkout/components/ui';
import { Formatter } from '../format';

export const CardHolder: React.SFC = (props) =>
    (
        <Input formatter={Formatter.formatCardHolder} icon={IconType.user} placeholder='Имя на карте'/>
    );
