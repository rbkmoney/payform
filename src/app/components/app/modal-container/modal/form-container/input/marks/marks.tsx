import * as React from 'react';
import { CSSTransition } from 'react-transition-group';
import * as styles from '../input.scss';
import { Icon, IconType } from 'checkout/components/ui';

interface MarksProps {
    active: boolean;
    pristine: boolean;
    error: boolean;
}

export const Marks: React.SFC<MarksProps> = (props) => (
    <CSSTransition
        component='div'
        classNames={{
            appear: styles.appearMarks,
            enter: styles.enterMarks,
            exit: styles.leaveMarks
        }}
        timeout={{enter: 5450, exit: 450}}
        transitionAppear={true}
        transitionEnter={true}
        transitionLeave={true}
    >
        {!props.active && !props.error && !props.pristine ? <Icon className={styles.checkmark} icon={IconType.checkmark}/> : false}
        {!props.active && props.error ? <Icon className={styles.errorCross} icon={IconType.redCross}/> : false}
    </CSSTransition>
);
