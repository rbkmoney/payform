import * as React from 'react';
import * as CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { connect } from 'react-redux';
import * as styles from './modal-container.scss';
import { Modal } from './modal';
import { Footer } from './footer';
import { ResultState, State } from '../../../state';

interface ModalContainerProps {
    result: ResultState;
}

const ModalContainerDef: React.SFC<ModalContainerProps> = (props) => (
    <CSSTransitionGroup
        component='div'
        transitionName={{
            appear: styles.appearContainer,
            enter: styles.enterContainer,
            leave: styles.leaveContainer
        }}
        transitionEnterTimeout={1000}
        transitionLeaveTimeout={950}
        transitionAppearTimeout={1000}
        transitionAppear={true}
        transitionEnter={true}
        transitionLeave={true}
    >
        <div className={styles.container}>
            <Modal/>
            <Footer/>{/*For desktop*/}
        </div>
    </CSSTransitionGroup>
);

const mapStateToProps = (state: State) => ({
    result: state.result
});

export const ModalContainer = connect(mapStateToProps)(ModalContainerDef);
