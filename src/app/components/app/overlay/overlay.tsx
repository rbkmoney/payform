import * as React from 'react';
import * as cx from 'classnames';
import { CSSTransitionGroup } from 'react-transition-group';
import { appear, leave, leaveActive, overlay, img, bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8 } from './overlay.scss';
import { connect } from 'react-redux';
import { ResultState, State } from 'checkout/state';

interface OverlayDefProps {
    inFrame: boolean;
    result: ResultState;
}

const backgrounds = [bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8];

const getRandomBg = (): string => backgrounds[Math.floor(Math.random() * backgrounds.length)];

const OverlayDef: React.SFC<OverlayDefProps> = ({ result, inFrame }) => (
    <CSSTransitionGroup
        transitionName={{ enter: null, appear, leave, leaveActive }}
        transitionEnter={false}
        transitionAppear={true}
        transitionAppearTimeout={750}
        transitionLeaveTimeout={750}>
        {result === ResultState.close ? null : (
            <div
                key="overlay"
                className={cx(overlay, {
                    [img]: inFrame,
                    [getRandomBg()]: inFrame
                })}
            />
        )}
    </CSSTransitionGroup>
);

const mapStateToProps = (state: State) => ({
    inFrame: state.config.inFrame,
    result: state.result
});

export const Overlay = connect(mapStateToProps)(OverlayDef);
