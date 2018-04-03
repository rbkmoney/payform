import * as React from 'react';
import * as cx from 'classnames';
import { CSSTransitionGroup } from 'react-transition-group';
import { appear, leave, overlay, img } from './overlay.scss';
import { connect } from 'react-redux';
import { State } from 'checkout/state';

interface OverlayDefProps {
    inFrame: boolean;
}

const OverlayDef: React.SFC<OverlayDefProps> = (props) => (
    <CSSTransitionGroup
        transitionName={{enter: null, appear, leave}}
        transitionEnter={false}
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionLeaveTimeout={500}>
        <div key='overlay' className={cx(overlay, {
            [img]: props.inFrame
        })}/>
    </CSSTransitionGroup>
);

const mapStateToProps = (state: State) => ({
    inFrame: state.config.inFrame
});

export const Overlay = connect(mapStateToProps)(OverlayDef);
