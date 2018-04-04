import * as React from 'react';
import * as cx from 'classnames';
import { CSSTransitionGroup } from 'react-transition-group';
import { appear, leave, overlay, img, bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8 } from './overlay.scss';
import { connect } from 'react-redux';
import { State } from 'checkout/state';

interface OverlayDefProps {
    inFrame: boolean;
}

const backgrounds = [bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8];

const getRandom = (): number => Math.floor(Math.random() * 7);

const OverlayDef: React.SFC<OverlayDefProps> = (props) => (
    <CSSTransitionGroup
        transitionName={{enter: null, appear, leave}}
        transitionEnter={false}
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionLeaveTimeout={500}>
        <div key='overlay' className={cx(overlay, {
            [img]: props.inFrame,
            [backgrounds[getRandom()]]: props.inFrame
        })}/>
    </CSSTransitionGroup>
);

const mapStateToProps = (state: State) => ({
    inFrame: state.config.inFrame
});

export const Overlay = connect(mapStateToProps)(OverlayDef);
