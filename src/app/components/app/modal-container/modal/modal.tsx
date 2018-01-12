import * as React from 'react';
import * as CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import * as styles from './modal.scss';
import { Close } from './close';
import { Info } from './info';
import { Footer } from '../footer';
import { MobileHeader } from './mobile-header';
import { FormContainer } from './form-container';
import { connect } from 'react-redux';
import { State } from 'checkout/state';
import { InitConfig } from 'checkout/config';

export interface ModalProps {
    initConfig: InitConfig;
}

const ModalDef: React.SFC<ModalProps> = (props) => (
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
        <div className={styles.form_container} id='container'>
            {props.initConfig.popupMode ? null : <Close/>}
            <MobileHeader/>
            <Info/>
            <FormContainer/>
            <Footer/>{/*For mobile*/}
        </div>
    </CSSTransitionGroup>
);

const mapStateToProps = (state: State) => ({
    initConfig: state.config.initConfig
});

export const Modal = connect(mapStateToProps)(ModalDef);
