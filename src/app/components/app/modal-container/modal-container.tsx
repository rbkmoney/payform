import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { CSSTransitionGroup } from 'react-transition-group';
import * as cx from 'classnames';

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
    ResultType,
    ResultState
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
    result: ResultState;
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
        const {
            activeModal: { name },
            config: { inFrame },
            result
        } = this.props;
        return (
            <CSSTransitionGroup
                component="div"
                className={styles.animationContainer}
                transitionName={{
                    appear: styles.appearContainer,
                    enter: styles.enterContainer,
                    leave: styles.leaveContainer,
                    leaveActive: styles.leaveActiveContainer
                }}
                transitionEnterTimeout={750}
                transitionLeaveTimeout={750}
                transitionAppearTimeout={750}
                transitionAppear={true}
                transitionEnter={true}
                transitionLeave={true}>
                {result === ResultState.close || result === ResultState.closeAfterDone ? null : (
                    <div className={styles.container}>
                        <CSSTransitionGroup
                            component="div"
                            transitionName="interactionAnimation"
                            transitionEnterTimeout={1000}
                            transitionLeaveTimeout={500}>
                            <div key={name}>
                                {!inFrame && <Close />}
                                {this.renderModal(name)}
                            </div>
                        </CSSTransitionGroup>
                        {!!isInteractionPolling(this.props.activeModal) && (
                            <ModalLoader
                                className={cx({ [styles.modalInteractionLoader]: name === ModalName.modalInteraction })}
                            />
                        )}
                    </div>
                )}
            </CSSTransitionGroup>
        );
    }

    private renderModal = (name: ModalName | string): React.ReactNode => {
        switch (name) {
            case ModalName.modalForms:
                return (
                    <>
                        <Modal />
                        <Footer />
                    </>
                );
            case ModalName.modalInteraction:
                return <UserInteractionModal />;
            default:
                return null;
        }
    };
}

const mapStateToProps = (state: State) => ({
    activeModal: state.modals.find((modal) => modal.active),
    config: state.config,
    unhandledError: state.error && state.error.status === ErrorStatus.unhandled,
    result: state.result
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    goToFormInfo: bindActionCreators(goToFormInfo, dispatch),
    acceptError: bindActionCreators(acceptError, dispatch),
    finishInteraction: bindActionCreators(finishInteraction, dispatch)
});

export const ModalContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalContainerDef);
