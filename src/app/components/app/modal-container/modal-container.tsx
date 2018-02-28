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
    setModalInteractionPollingStatus, goToFormInfo, pollCustomerEvents
} from 'checkout/actions';
import { CustomerEvent, Event } from 'checkout/backend';
import { ModalLoader } from './modal-loader';
import { Config, CustomerInitConfig, IntegrationType } from 'checkout/config';
import { Close } from '../modal-container/modal/close';

export interface ModalContainerProps {
    activeModal: ModalState;
    model: ModelState;
    config: Config;
    unhandledError: boolean;
    setModalFromEvents: (events: Event[] | CustomerEvent[]) => any;
    acceptModel: () => any;
    pollInvoiceEvents: (capiEndpoint: string, accessToken: string, events: Event[]) => any;
    pollCustomerEvents: (capiEndpoint: string, accessToken: string, customerID: string, events: CustomerEvent[]) => any;
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
                const {config: {appConfig: {capiEndpoint}, initConfig}} = this.props;
                switch (initConfig.integrationType) {
                    case IntegrationType.invoice:
                    case IntegrationType.invoiceTemplate:
                        const {model: {invoiceAccessToken, invoiceEvents}} = this.props;
                        this.props.pollInvoiceEvents(capiEndpoint, invoiceAccessToken, invoiceEvents);
                        break;
                    case IntegrationType.customer:
                        const {customerID, customerAccessToken} = (initConfig as CustomerInitConfig);
                        const {customerEvents} = this.props.model;
                        this.props.pollCustomerEvents(capiEndpoint, customerAccessToken, customerID, customerEvents);
                        break;
                }
                this.props.setModalInteractionPollingStatus(true);
            }
        });
    }

    componentWillReceiveProps(props: ModalContainerProps) {
        if (props.model.status === ModelStatus.refreshed) {
            props.setModalInteractionPollingStatus(false);
            switch (props.config.initConfig.integrationType) {
                case IntegrationType.invoice:
                case IntegrationType.invoiceTemplate:
                    props.setModalFromEvents(props.model.invoiceEvents);
                    break;
                case IntegrationType.customer:
                    props.setModalFromEvents(props.model.customerEvents);
                    break;
            }
            props.acceptModel();
        }
        if (props.unhandledError) {
            props.goToFormInfo(new ResultFormInfo(ResultType.error));
            props.acceptError();
        }
    }

    render() {
        const {activeModal: {name}, config: {initConfig: {popupMode}}} = this.props;
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
                                {popupMode ? null : <Close/>}
                                <Modal/>
                                <Footer/>
                            </div> : null}
                        {name === ModalName.modalInteraction ?
                            <div>
                                {popupMode ? null : <Close/>}
                                <UserInteractionModal/>
                            </div> : null}
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
    config: state.config,
    unhandledError: state.error && state.error.status === ErrorStatus.unhandled
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setModalFromEvents: bindActionCreators(setModalFromEvents, dispatch),
    acceptModel: bindActionCreators(accept, dispatch),
    pollInvoiceEvents: bindActionCreators(pollInvoiceEvents, dispatch),
    pollCustomerEvents: bindActionCreators(pollCustomerEvents, dispatch),
    goToFormInfo: bindActionCreators(goToFormInfo, dispatch),
    acceptError: bindActionCreators(acceptError, dispatch),
    setModalInteractionPollingStatus: bindActionCreators(setModalInteractionPollingStatus, dispatch)
});

export const ModalContainer = connect(mapStateToProps, mapDispatchToProps)(ModalContainerDef);
