import * as React from 'react';
import * as CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import * as styles from './modal.scss';
import { Close } from './close';
import { Info } from './info';
import { Footer } from '../footer';
import { MobileHeader } from './mobile-header';
import { FormContainer } from './form-container';

const ModalDef: React.SFC = () => (
    <CSSTransitionGroup
        component='div'
        transitionName={{
            appear: styles.appearFormContainer,
            enter: styles.enterFormContainer,
            leave: styles.leaveFormContainer
        }}
        transitionEnterTimeout={1000}
        transitionLeaveTimeout={1000}
        transitionAppearTimeout={1000}
        transitionAppear={true}
        transitionEnter={true}
        transitionLeave={true}
    >
        <div className={styles.form_container}>
            <Close/>
            <MobileHeader/>
            <Info/>
            <FormContainer/>
            <Footer/>{/*For mobile*/}
        </div>
    </CSSTransitionGroup>
);

export const Modal = ModalDef;
