import * as React from 'react';
import {Icon, IconType} from 'checkout/components';
import {NavigateDirection} from 'checkout/actions';
import {FormName} from 'checkout/state';

interface ChevronBackProps {
    className: string;
    destination: FormName;
    navigateTo: (formName: FormName, direction: NavigateDirection) => any;
}

const back = (props: ChevronBackProps) => props.navigateTo(props.destination, NavigateDirection.back);

export const ChevronBack: React.SFC<ChevronBackProps> = (props) => (
    <div className={props.className} onClick={back.bind(null, props)}>
         <Icon icon={IconType.chevronLeft}/>
     </div>
);
