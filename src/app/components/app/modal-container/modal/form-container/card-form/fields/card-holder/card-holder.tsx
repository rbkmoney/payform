import * as React from 'react';
import { Input } from '../../../input';
import { IconType } from 'checkout/components/ui';
import { cardHolderFormatter } from '../format';

export const CardHolder: React.SFC = (props) =>
    (
        <Input formatter={cardHolderFormatter} icon={IconType.user} placeholder='Имя на карте'/>
    );
