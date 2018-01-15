import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import * as CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { connect } from 'react-redux';
import * as styles from './modal-container.scss';
import { Modal } from './modal';
import { Footer } from './footer';
import { UserInteractionModal } from './user-interaction-modal';
import { ErrorHandleStatus, ErrorState, ModalName, ModalState, ModelState, State } from 'checkout/state';
import { pollInvoiceEvents, process, setErrorFormInfo, setErrorStatus, setModalFromEvents } from 'checkout/actions';
import { AppConfig, Event } from 'checkout/backend';

export interface ModalContainerProps {
    activeModal: ModalState;
    model: ModelState;
    appConfig: AppConfig;
    error: ErrorState;
    setModalFromEvents: (events: Event[]) => any;
    processModel: () => any;
    pollInvoiceEvents: (capiEndpoint: string, accessToken: string, events: Event[]) => any;
    setErrorFormInfo: () => any;
    setErrorStatus: (status: ErrorHandleStatus) => any;
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
        if (props.model.processed === false) {
            props.setModalFromEvents(props.model.invoiceEvents);
            props.processModel();
        }
        if (props.error && props.error.status === ErrorHandleStatus.unhandled) {
            props.setErrorFormInfo();
            props.setErrorStatus(ErrorHandleStatus.processed);
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
    error: state.error
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setModalFromEvents: bindActionCreators(setModalFromEvents, dispatch),
    processModel: bindActionCreators(process, dispatch),
    pollInvoiceEvents: bindActionCreators(pollInvoiceEvents, dispatch),
    setErrorFormInfo: bindActionCreators(setErrorFormInfo, dispatch),
    setErrorStatus: bindActionCreators(setErrorStatus, dispatch)
});

export const ModalContainer = connect(mapStateToProps, mapDispatchToProps)(ModalContainerDef);
