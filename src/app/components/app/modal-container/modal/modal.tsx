import * as React from 'react';
import * as CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import * as styles from './modal.scss';
import * as cx from 'classnames';
import { Info } from './info';
import { Footer } from '../footer';
import { MobileHeader } from './mobile-header';
import { FormContainer } from './form-container';
import {State} from 'checkout/state';
import {connect} from 'react-redux';

interface ModalDefProps {
    popupMode: boolean;
}

const ModalDef: React.SFC<ModalDefProps> = (props) => (
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
        <div className={cx(styles.form_container, {
            [styles.with_shadow]: props.popupMode
        })} id='form-container'>
            <MobileHeader/>
            <Info/>
            <FormContainer/>
            <Footer/>{/*For mobile*/}
        </div>
    </CSSTransitionGroup>
);

const mapStateToProps = (state: State) => ({
    popupMode: state.config.initConfig.popupMode
});

export const Modal = connect(mapStateToProps)(ModalDef);
