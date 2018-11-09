import * as React from 'react';
import * as cx from 'classnames';
import { CSSTransitionGroup } from 'react-transition-group';
import { appear, leave, leaveActive, overlay, img, bg0 as bg } from './overlay.scss';
import { connect } from 'react-redux';
import { ResultState, State } from 'checkout/state';

interface OverlayDefProps {
    inFrame: boolean;
    result: ResultState;
}

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
                    [bg]: inFrame
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
