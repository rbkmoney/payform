import * as React from 'react';
import * as cx from 'classnames';
import { CSSTransitionGroup } from 'react-transition-group';
import { appear, leave, overlay, img } from './overlay.scss';
import { connect } from 'react-redux';
import { State } from 'checkout/state';

interface OverlayDefProps {
    inIframe: boolean;
}

const OverlayDef: React.SFC<OverlayDefProps> = (props) => (
    <CSSTransitionGroup
        transitionName={{enter: null, appear, leave}}
        transitionEnter={false}
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionLeaveTimeout={500}>
        <div key='overlay' className={cx(overlay, {
            [img]: props.inIframe
        })}/>
    </CSSTransitionGroup>
);

const mapStateToProps = (state: State) => ({
    inIframe: state.config.inIframe
});

export const Overlay = connect(mapStateToProps)(OverlayDef);
