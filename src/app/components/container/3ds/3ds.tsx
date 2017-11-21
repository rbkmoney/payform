import * as React from 'react';
import * as TransitionGroup from 'react-transition-group';
import * as styles from './3ds.scss';

export class ThreeDSContainer extends React.Component {
    render() {
        const CSSTransitionGroup = TransitionGroup.CSSTransitionGroup;
        return (
            <CSSTransitionGroup
                component='div'
                transitionName={{
                    appear: styles.appear,
                    enter: styles.enter,
                    leave: styles.leave
                }}
                transitionEnterTimeout={1000}
                transitionLeaveTimeout={1000}
                transitionAppearTimeout={1000}
                transitionAppear={true}
                transitionEnter={true}
                transitionLeave={true}
            >
                <div className={styles.container} key='3ds'>
                    ТРИИИИДЕЕЭЭЭЭЭЭС
                </div>
            </CSSTransitionGroup>
        );
    }
}
