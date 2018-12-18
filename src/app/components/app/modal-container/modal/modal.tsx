import * as React from 'react';
import { connect } from 'react-redux';
import * as CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import * as styles from './modal.scss';
import { Info } from './info';
import { Footer } from '../footer';
import { MobileHeader } from './mobile-header';
import { FormContainer } from './form-container';
import { State } from 'checkout/state';
import { FormBlock } from './form-block';

interface ModalDefProps {
    inFrame: boolean;
}

const ModalDef: React.FC<ModalDefProps> = (props) => (
    <CSSTransitionGroup
        component="div"
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
        transitionLeave={true}>
        <FormBlock id="form-container" inFrame={props.inFrame}>
            <MobileHeader />
            <Info />
            <FormContainer />
            <Footer />
        </FormBlock>
    </CSSTransitionGroup>
);

const mapStateToProps = (state: State) => ({
    inFrame: state.config.inFrame
});

export const Modal = connect(mapStateToProps)(ModalDef);
