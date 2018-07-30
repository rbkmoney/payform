import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { CSSTransitionGroup } from 'react-transition-group';
import * as styles from './modal-container.scss';
import { Modal } from './modal';
import { Footer } from './footer';
import { UserInteractionModal } from './user-interaction-modal';
import {
    ErrorStatus,
    ModalName,
    ModalState,
    State,
    ModalInteraction,
    FormInfo,
    ResultFormInfo,
    ResultType
} from 'checkout/state';
import { acceptError, goToFormInfo, finishInteraction } from 'checkout/actions';
import { ModalLoader } from './modal-loader';
import { Config } from 'checkout/config';
import { Close } from '../modal-container/modal/close';

export interface ModalContainerProps {
    activeModal: ModalState;
    config: Config;
    unhandledError: boolean;
    goToFormInfo: (formInfo: FormInfo) => any;
    acceptError: () => any;
    finishInteraction: () => any;
}

const isInteractionPolling = (modal: ModalState) =>
    modal.name === ModalName.modalInteraction && (modal as ModalInteraction).pollingEvents;

class ModalContainerDef extends React.Component<ModalContainerProps> {

    componentWillMount() {
        window.addEventListener('message', (e) => {
            if (e.data === 'finish-interaction') {
                this.props.finishInteraction();
            }
        });
    }

    componentWillReceiveProps(props: ModalContainerProps) {
        // TODO fix it
        if (props.unhandledError) {
            props.goToFormInfo(new ResultFormInfo(ResultType.error));
            props.acceptError();
        }
    }

    render() {
        const {config: {inFrame}, activeModal} = this.props;
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
                transitionLeave={true}>
                <div className={styles.container}>
                    <CSSTransitionGroup
                        component='div'
                        transitionName='interactionAnimation'
                        transitionEnterTimeout={1000}
                        transitionLeaveTimeout={500}>
                        {!inFrame && <Close/>}
                        {this.renderModal()}
                    </CSSTransitionGroup>
                    {isInteractionPolling(activeModal) && <ModalLoader/>}
                </div>
            </CSSTransitionGroup>
        );
    }

    private renderModal() {
        switch (this.props.activeModal.name) {
            case ModalName.modalForms:
                return (
                    <>
                        <Modal/>
                        <Footer/>
                    </>
                );
            case ModalName.modalInteraction:
                return <UserInteractionModal/>;
            default:
                return null;
        }
    }
}

const mapStateToProps = (state: State) => ({
    activeModal: state.modals.find((modal) => modal.active),
    config: state.config,
    unhandledError: state.error && state.error.status === ErrorStatus.unhandled
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    goToFormInfo: bindActionCreators(goToFormInfo, dispatch),
    acceptError: bindActionCreators(acceptError, dispatch),
    finishInteraction: bindActionCreators(finishInteraction, dispatch)
});

export const ModalContainer = connect(mapStateToProps, mapDispatchToProps)(ModalContainerDef);
