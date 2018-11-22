import * as React from 'react';

import { ChevronLeft } from 'checkout/components';

interface ChevronBackProps {
    className?: string;
    back: () => any;
    id: string;
}

export const ChevronBack: React.FC<ChevronBackProps> = (props) => (
    <div className={props.className} onClick={props.back} id={props.id}>
        <ChevronLeft />
    </div>
);
