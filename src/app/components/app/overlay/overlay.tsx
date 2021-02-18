import * as React from 'react';
import { connect } from 'react-redux';

import * as bg1 from './backgrounds/1.jpg';
import * as bg2 from './backgrounds/2.jpg';
import * as bg3 from './backgrounds/3.jpg';
import * as bg4 from './backgrounds/4.jpg';
import * as bg5 from './backgrounds/5.jpg';
import * as bg6 from './backgrounds/6.jpg';
import * as bg7 from './backgrounds/7.jpg';
import * as bg8 from './backgrounds/8.jpg';
import * as bg9 from './backgrounds/9.jpg';

import { ResultState, State } from 'checkout/state';
import styled, { css } from 'checkout/styled-components';
import { device } from 'checkout/utils/device';
import { stylableTransition, APPEAR, LEAVE, ACTIVE } from 'checkout/styled-transition';
import { fadein, fadeout } from 'checkout/styled-components/animations';

const backgrounds = [bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9];
// нужно подготовить фон, чтобы он не перерендеревался
const bg = backgrounds[Math.floor(Math.random() * backgrounds.length)];

const Animation = styled(stylableTransition)`
    ${APPEAR} {
        animation: ${fadein} 0.75s;
    }

    ${LEAVE} {
        animation: ${fadeout} 0.75s;

        ${ACTIVE} {
            opacity: 0;
        }
    }
`;

interface OverlayDefProps {
    inFrame: boolean;
    result: ResultState;
}

const OverlayBg = styled.div<{ inFrame: boolean }>`
    // Safari popup animation fix
    -webkit-transform: translateZ(-1000px);

    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    @media ${device.desktop} {
        background: rgba(0, 0, 0, 0.7);
    }

    ${({ inFrame, theme }) =>
        inFrame &&
        css`
            :before {
                content: '';
                display: block;
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-image: ${theme.gradients.bg};
                opacity: 0.35;
            }

            @media ${device.desktop} {
                background: transparent url(${bg}) bottom center;
                background-size: cover;
            }
        `}
`;

const OverlayDef: React.FC<OverlayDefProps> = ({ result, inFrame }) => (
    <Animation appear={750} leave={750}>
        {result !== ResultState.close && <OverlayBg inFrame={inFrame} key="overlay" />}
    </Animation>
);

const mapStateToProps = (state: State) => ({
    inFrame: state.config.inFrame,
    result: state.result
});

export const Overlay = connect(mapStateToProps)(OverlayDef);
