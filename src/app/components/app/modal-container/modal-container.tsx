import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import * as CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { connect } from 'react-redux';
import * as styles from './modal-container.scss';
import { Modal } from './modal';
import { Footer } from './footer';
import { UserInteractionModal } from './user-interaction-modal';
import { ErrorStatus, ModalName, ModalState, ModelState, State, ModelStatus } from 'checkout/state';
import { accept, pollInvoiceEvents, setErrorFormInfo, acceptError, setModalFromEvents } from 'checkout/actions';
import { AppConfig, Event } from 'checkout/backend';

export interface ModalContainerProps {
    activeModal: ModalState;
    model: ModelState;
    appConfig: AppConfig;
    unhandledError: boolean;
    setModalFromEvents: (events: Event[]) => any;
    acceptModel: () => any;
    pollInvoiceEvents: (capiEndpoint: string, accessToken: string, events: Event[]) => any;
    setErrorFormInfo: () => any;
    acceptError: () => any;
}

class ModalContainerDef extends React.Component<ModalContainerProps> {

    componentWillMount() {
        window.addEventListener('message', (e) => {
            if (e.data === 'finish-interaction') {
                const {appConfig: {capiEndpoint}, model: {invoiceAccessToken, invoiceEvents}} = this.props;
                this.props.pollInvoiceEvents(capiEndpoint, invoiceAccessToken, invoiceEvents);
            }
        });
    }

    componentWillReceiveProps(props: ModalContainerProps) {
        if (props.model.status === ModelStatus.refreshed) {
            props.setModalFromEvents(props.model.invoiceEvents);
            props.acceptModel();
        }
        if (props.unhandledError) {
            props.setErrorFormInfo();
            props.acceptError();
        }
    }

    render() {
        const {name} = this.props.activeModal;
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
    activeModal: state.modals.find((modal) => modal.active),
    model: state.model,
    appConfig: state.config.appConfig,
    unhandledError: state.error && state.error.status === ErrorStatus.unhandled
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setModalFromEvents: bindActionCreators(setModalFromEvents, dispatch),
    acceptModel: bindActionCreators(accept, dispatch),
    pollInvoiceEvents: bindActionCreators(pollInvoiceEvents, dispatch),
    setErrorFormInfo: bindActionCreators(setErrorFormInfo, dispatch),
    acceptError: bindActionCreators(acceptError, dispatch)
});

export const ModalContainer = connect(mapStateToProps, mapDispatchToProps)(ModalContainerDef);
