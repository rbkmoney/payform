import * as React from 'react';
import {IconType} from './icon-type';

interface IconProps {
    icon: IconType;
    className?: string;
}

export const Icon: React.SFC<IconProps> = (props) => {
    return (
        <svg {...props} dangerouslySetInnerHTML={{__html: `<use xlink:href='assets/icons/${props.icon}.svg#icon' />`}}/>
    );
};
