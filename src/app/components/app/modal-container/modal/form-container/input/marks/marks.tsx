import * as React from 'react';
import * as CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import * as styles from '../input.scss';
import { Icon, IconType } from 'checkout/components/ui';
import styled from 'checkout/styled-components';

const StyledIcon = styled(Icon)`
    display: flex;
    position: absolute;
    right: 0;
    top: 0;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
`;

const CheckmarkIcon = styled(StyledIcon)`
    height: 9px;
    width: 13px;
    margin: 19px 15px 0 19px;
`;

const ErrorCrossIcon = styled(StyledIcon)`
    height: 18px;
    width: 18px;
    margin: 15px 15px 0 19px;
    transform: scale(0.7);
`;

interface MarksProps {
    active: boolean;
    pristine: boolean;
    error: boolean;
}

export const Marks: React.FC<MarksProps> = (props) => (
    <CSSTransitionGroup
        component="div"
        transitionName={{
            appear: styles.appearMarks,
            enter: styles.enterMarks,
            leave: styles.leaveMarks
        }}
        transitionEnterTimeout={450}
        transitionLeaveTimeout={450}
        transitionAppearTimeout={450}
        transitionAppear={true}
        transitionEnter={true}
        transitionLeave={true}>
        {!props.active && !props.error && !props.pristine && <CheckmarkIcon icon={IconType.checkmark} />}
        {!props.active && !!props.error && <ErrorCrossIcon icon={IconType.redCross} />}
    </CSSTransitionGroup>
);
