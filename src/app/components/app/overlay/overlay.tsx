import * as React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';

import { appear, leave, leaveActive } from './overlay.scss';
import { ResultState, State } from 'checkout/state';
import styled, { css } from 'checkout/styled-components';

import * as bg1 from './backgrounds/1.jpg';
import * as bg2 from './backgrounds/2.jpg';
import * as bg3 from './backgrounds/3.jpg';
import * as bg4 from './backgrounds/4.jpg';
import * as bg5 from './backgrounds/5.jpg';
import * as bg6 from './backgrounds/6.jpg';
import * as bg7 from './backgrounds/7.jpg';
import * as bg8 from './backgrounds/8.jpg';
import * as bg9 from './backgrounds/9.jpg';

const backgrounds = [bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9];

interface OverlayDefProps {
    inFrame: boolean;
    result: ResultState;
}

const OverlayBg = styled.div<{ inFrame: boolean }>`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);

    ${({ inFrame }) =>
        !!inFrame &&
        css`
            background: transparent url(${backgrounds[Math.floor(Math.random() * backgrounds.length)]}) bottom center;
            background-size: cover;

            :before {
                content: '';
                display: block;
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                opacity: 0.35;
                background-image: linear-gradient(to top right, #9016f6, #6b35ff);
            }
        `}
`;

const OverlayDef: React.FC<OverlayDefProps> = ({ result, inFrame }) => (
    <CSSTransitionGroup
        transitionName={{ enter: null, appear, leave, leaveActive }}
        transitionEnter={false}
        transitionAppear={true}
        transitionAppearTimeout={750}
        transitionLeaveTimeout={750}>
        {result !== ResultState.close && <OverlayBg inFrame={inFrame} key="overlay" />}
    </CSSTransitionGroup>
);

const mapStateToProps = (state: State) => ({
    inFrame: state.config.inFrame,
    result: state.result
});

export const Overlay = connect(mapStateToProps)(OverlayDef);
