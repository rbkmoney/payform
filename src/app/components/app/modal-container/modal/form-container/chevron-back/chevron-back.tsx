import * as React from 'react';
import {Icon, IconType} from 'checkout/components';

interface ChevronBackProps {
    className: string;
    back: () => any;
}

export const ChevronBack: React.SFC<ChevronBackProps> = (props) => (
    <div className={props.className} onClick={props.back}>
         <Icon icon={IconType.chevronLeft}/>
    </div>
);
