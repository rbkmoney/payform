import * as React from 'react';
import {Icon, IconType} from 'checkout/components';
import {NavigateDirection} from 'checkout/actions';
import {FormName} from 'checkout/state';

interface ChevronBackProps {
    className: string;
    previous: FormName;
    navigateTo: (formName: FormName, direction: NavigateDirection) => any;
}

const back = (props: ChevronBackProps) => props.navigateTo(props.previous, NavigateDirection.back);

export const ChevronBack: React.SFC<ChevronBackProps> = (props) => (
    <div className={props.className} onClick={back.bind(null, props)}>
         <Icon icon={IconType.chevronLeft}/>
     </div>
);
