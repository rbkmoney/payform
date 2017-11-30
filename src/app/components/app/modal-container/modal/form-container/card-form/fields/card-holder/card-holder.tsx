import * as React from 'react';
import { Input } from '../../../input';
import { IconType } from 'checkout/components/ui';

export const CardHolder: React.SFC = (props) =>
    (
        <Input icon={IconType.user} placeholder='Имя на карте'/>
    );
