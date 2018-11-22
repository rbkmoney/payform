import * as React from 'react';
import * as CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import { Checkmark, BoldCross } from 'checkout/components';
import * as styles from '../input.scss';
import styled, { css } from 'checkout/styled-components';

const iconStyle = css`
    display: flex;
    position: absolute;
    right: 0;
    top: 0;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
`;

const CheckmarkIcon = styled(Checkmark)`
    ${iconStyle};
    height: 9px;
    width: 13px;
    margin: 19px 15px 0 19px;
`;

const ErrorCrossIcon = styled(BoldCross)`
    ${iconStyle};
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
        {!props.active && (props.error ? <ErrorCrossIcon /> : !props.pristine && <CheckmarkIcon />)}
    </CSSTransitionGroup>
);
