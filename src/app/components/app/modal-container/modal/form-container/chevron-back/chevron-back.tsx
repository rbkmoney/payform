import * as React from 'react';
import { Icon, IconType } from 'checkout/components';

interface ChevronBackProps {
    className: string;
    back: () => any;
    id: string;
}

export const ChevronBack: React.SFC<ChevronBackProps> = (props) => (
    <div className={props.className} onClick={props.back} id={props.id}>
        <Icon icon={IconType.chevronLeft}/>
    </div>
);
