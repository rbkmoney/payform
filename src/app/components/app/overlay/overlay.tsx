import * as React from 'react';
import * as CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import * as styles from './overlay.scss';

const OverlayDef: React.SFC = () => (
    <CSSTransitionGroup
        component='div'
        className={styles.overlayContainer}
        transitionName={{
            appear: styles.appearOverlay,
            enter: styles.enterOverlay,
            leave: styles.leaveOverlay
        }}
        transitionEnterTimeout={1000}
        transitionLeaveTimeout={1000}
        transitionAppearTimeout={1000}
        transitionAppear={true}
        transitionEnter={true}
        transitionLeave={true}
    >
        <div className={styles.overlay}/>
    </CSSTransitionGroup>
);

export const Overlay = OverlayDef;
