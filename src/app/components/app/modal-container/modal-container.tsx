import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import * as CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { connect } from 'react-redux';
import * as styles from './modal-container.scss';
import { Modal } from './modal';
import { Footer } from './footer';
import { UserInteractionModal } from './user-interaction-modal';
import {
    ErrorStatus,
    ModalName,
    ModalState,
    ModelState,
    State,
    ModelStatus,
    ModalInteraction,
    FormInfo,
    ResultFormInfo,
    ResultType
} from 'checkout/state';
import {
    accept, pollInvoiceEvents, acceptError, setModalFromEvents,
    setModalInteractionPollingStatus, goToFormInfo
} from 'checkout/actions';
import { AppConfig, Event } from 'checkout/backend';
import { ModalLoader } from './modal-loader';

export interface ModalContainerProps {
    activeModal: ModalState;
    model: ModelState;
    appConfig: AppConfig;
    unhandledError: boolean;
    setModalFromEvents: (events: Event[]) => any;
    acceptModel: () => any;
    pollInvoiceEvents: (capiEndpoint: string, accessToken: string, events: Event[]) => any;
    goToFormInfo: (formInfo: FormInfo) => any;
    acceptError: () => any;
    setModalInteractionPollingStatus: (status: boolean) => any;
}

const isInteractionPolling = (modal: ModalState) =>
    modal.name === ModalName.modalInteraction && (modal as ModalInteraction).pollingEvents;

class ModalContainerDef extends React.Component<ModalContainerProps> {

    componentWillMount() {
        window.addEventListener('message', (e) => {
            if (e.data === 'finish-interaction') {
                const {appConfig: {capiEndpoint}, model: {invoiceAccessToken, invoiceEvents}} = this.props;
                this.props.pollInvoiceEvents(capiEndpoint, invoiceAccessToken, invoiceEvents);
                this.props.setModalInteractionPollingStatus(true);
            }
        });
    }

    componentWillReceiveProps(props: ModalContainerProps) {
        if (props.model.status === ModelStatus.refreshed) {
            props.setModalInteractionPollingStatus(false);
            props.setModalFromEvents(props.model.invoiceEvents);
            props.acceptModel();
        }
        if (props.unhandledError) {
            props.goToFormInfo(new ResultFormInfo(ResultType.error));
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
                    {isInteractionPolling(this.props.activeModal) ? <ModalLoader/> : null}
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
    goToFormInfo: bindActionCreators(goToFormInfo, dispatch),
    acceptError: bindActionCreators(acceptError, dispatch),
    setModalInteractionPollingStatus: bindActionCreators(setModalInteractionPollingStatus, dispatch)
});

export const ModalContainer = connect(mapStateToProps, mapDispatchToProps)(ModalContainerDef);
