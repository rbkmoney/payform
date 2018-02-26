import * as React from 'react';
import { CSSTransition } from 'react-transition-group';
import * as styles from './modal.scss';
import { Info } from './info';
import { Footer } from '../footer';
import { MobileHeader } from './mobile-header';
import { FormContainer } from './form-container';

const ModalDef: React.SFC = () => (
    <CSSTransition
        component='div'
        classNames={{
            appear: styles.appearFormContainer,
            enter: styles.enterFormContainer,
            exit: styles.leaveFormContainer
        }}
        timeout={{enter: 1000, exit: 1000}}
        transitionAppear={true}
        transitionEnter={true}
        transitionLeave={true}
    >
        <div className={styles.form_container} id='form-container'>
            <MobileHeader/>
            <Info/>
            <FormContainer/>
            <Footer/>{/*For mobile*/}
        </div>
    </CSSTransition>
);

export const Modal = ModalDef;
