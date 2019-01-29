import * as React from 'react';

import { Checkmark, BoldCross } from 'checkout/components/ui/icon';
import styled, { css } from 'checkout/styled-components';
import { stylableTransition, APPEAR, ENTER, LEAVE } from 'checkout/styled-transition';
import { fadein, fadeout } from 'checkout/styled-components/animations';

const FadeAnimation = styled(stylableTransition).attrs({
    appear: 450,
    leave: 450,
    enter: 450
})`
    ${APPEAR}, ${ENTER} {
        animation: ${fadein} 0.5s;
    }

    ${LEAVE} {
        animation: ${fadeout} 0.5s;
    }
`;

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
    g {
        stroke: ${({ theme }) => theme.color.primary[1]};
    }
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
    <FadeAnimation>
        {!props.active && (props.error ? <ErrorCrossIcon /> : !props.pristine && <CheckmarkIcon />)}
    </FadeAnimation>
);
