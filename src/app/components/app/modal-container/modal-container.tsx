import * as React from 'react';
import * as CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import * as styles from './modal-container.scss';
import { Modal } from './modal';
import { Footer } from './footer';

const ModalContainerDef: React.SFC = () => (
    <CSSTransitionGroup
        component='div'
        transitionName={{
            appear: styles.appearContainer,
            enter: styles.enterContainer,
            leave: styles.leaveContainer
        }}
        transitionEnterTimeout={1000}
        transitionLeaveTimeout={1000}
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

export const ModalContainer = ModalContainerDef;
