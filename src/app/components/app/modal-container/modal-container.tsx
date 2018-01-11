import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import * as CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { connect } from 'react-redux';
import * as styles from './modal-container.scss';
import { Modal } from './modal';
import { Footer } from './footer';
import { initModalState } from 'checkout/actions';
import { UserInteractionModal } from './user-interaction-modal';
import { ModalName, ModalState, State } from 'checkout/state';
import { Event } from 'checkout/backend';

export interface ModalContainerProps {
    invoiceEvents: Event[];
    modal: ModalState;
}

class ModalContainerDef extends React.Component<ModalContainerProps> {

    componentWillMount() {
        // this.props.setFormFlow(finishInteraction(this.props.formsFlow, getLastChange(this.props.invoiceEvents)))

        // window.addEventListener('message', (e) => e.data === 'finish-interaction'
        //     ? this.props.modalStateFromEvents(this.props.invoiceEvents)
        //     : null);
    }

    componentWillReceiveProps(props: ModalContainerProps) {
        console.log(props);
    }

    render() {
        const {name} = this.props.modal;
        return (
            <CSSTransitionGroup
                component='div'
                className={styles.animationContainer}
                transitionName={{
                    appear: styles.appearContainer,
                    enter: styles.enterContainer,
                    leave: styles.leaveContainer
                }}
                transitionEnterTimeout={950}
                transitionLeaveTimeout={950}
                transitionAppearTimeout={950}
                transitionAppear={true}
                transitionEnter={true}
                transitionLeave={true}
            >
                <div className={styles.container}>
                    <CSSTransitionGroup
                        component='div'
                        transitionName='interactionAnimation'
                        transitionEnterTimeout={1000}
                        transitionLeaveTimeout={500}
                    >
                        {name === ModalName.modalForms ?
                            <div>
                                <Modal/>
                                <Footer/>
                            </div> : null}
                        {name === ModalName.modalInteraction ? <UserInteractionModal/> : null}
                    </CSSTransitionGroup>
                </div>
            </CSSTransitionGroup>
        );
    }
}

const mapStateToProps = (state: State) => ({
    modal: state.modal,
    invoiceEvents: state.model.invoiceEvents
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    // modalStateFromEvents: bindActionCreators(initModalState, dispatch)
});

export const ModalContainer = connect(mapStateToProps, mapDispatchToProps)(ModalContainerDef);
