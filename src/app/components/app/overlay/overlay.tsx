import * as React from 'react';
import { connect } from 'react-redux';
import * as CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { ResultState, State } from '../../../state';
import * as styles from './overlay.scss';

interface OverlayProps {
    result: ResultState;
}

const OverlayDef: React.SFC<OverlayProps> = () => (
    <CSSTransitionGroup
        component='div'
        className={styles.overlayContainer}
        transitionName={{
            appear: styles.appearOverlay,
            enter: styles.enterOverlay,
            leave: styles.leaveOverlay
        }}
        transitionEnterTimeout={450}
        transitionLeaveTimeout={450}
        transitionAppearTimeout={450}
        transitionAppear={true}
        transitionEnter={true}
        transitionLeave={true}
    >
        <div className={styles.overlay}>
            <div />
        </div>
    </CSSTransitionGroup>
);

const mapStateToProps = (state: State) => ({
    result: state.result
});

export const Overlay = connect(mapStateToProps)(OverlayDef);
