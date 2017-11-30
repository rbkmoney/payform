import * as React from 'react';
import { Input } from '../../../input';
import { IconType } from 'checkout/components/ui';

export const Email: React.SFC = (props) =>
    (
        <Input icon={IconType.letter} placeholder='Email для чека'/>
    );
