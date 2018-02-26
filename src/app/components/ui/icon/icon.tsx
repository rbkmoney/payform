import * as React from 'react';
import { IconType } from './icon-type';

interface IconProps {
    icon: IconType;
    className?: string;
}

export const Icon: React.SFC<IconProps> = (props) => (
    <svg className={props.className}>
        <use xlinkHref={`assets/icons/${props.icon}.svg#icon`}/>
    </svg>
);
