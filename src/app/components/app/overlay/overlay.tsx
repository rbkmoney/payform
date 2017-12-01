import * as React from 'react';
import { connect } from 'react-redux';
import * as CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { ResultState, State } from '../../../state';
import * as styles from './overlay.scss';

interface OverlayProps {
    result: ResultState;
}

const OverlayDef: React.SFC<OverlayProps> = (props) => (
    <CSSTransitionGroup
        component='div'
        className={styles.overlayContainer}
        transitionName={{
            appear: styles.appearOverlay,
            enter: styles.enterOverlay,
            leave: styles.leaveOverlay
        }}
        transitionEnterTimeout={1000}
        transitionLeaveTimeout={450}
        transitionAppearTimeout={1000}
        transitionAppear={true}
        transitionEnter={true}
        transitionLeave={true}
    >
        <div className={styles.overlay}/>
    </CSSTransitionGroup>
);

const mapStateToProps = (state: State) => ({
    result: state.result
});

export const Overlay = connect(mapStateToProps)(OverlayDef);
