import * as React from 'react';
import {Icon, IconType} from 'checkout/components';
import * as formStyles from '../form-container.scss';

interface ChevronBackProps {
    back: () => void;
}

export const ChevronBack: React.SFC<ChevronBackProps> = (props) => (
    <div className={formStyles.back_btn} onClick={props.back}>
         <Icon icon={IconType.chevronLeft}/>
     </div>
);
