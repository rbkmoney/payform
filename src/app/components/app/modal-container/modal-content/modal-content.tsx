import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { Modal } from '../modal';
import { Footer } from '../footer';
import { UserInteractionModal } from '../user-interaction-modal';
import {
    ErrorStatus,
    ModalName,
    ModalState,
    State,
    FormInfo,
    ResultFormInfo,
    ResultType,
    ModalInteraction
} from 'checkout/state';
import { acceptError, goToFormInfo, finishInteraction } from 'checkout/actions';
import { ModalLoader } from 'checkout/components/app/modal-container/modal-loader';
import * as styles from 'checkout/components/app/modal-container/modal-container.scss';
import { CSSTransitionGroup } from 'react-transition-group';
import { Close } from 'checkout/components/app/modal-container/modal/close';

export interface ModalContentProps {
    activeModal: ModalState;
    unhandledError: boolean;
    goToFormInfo: (formInfo: FormInfo) => any;
    acceptError: () => any;
    finishInteraction: () => any;
    inFrame?: boolean;
}

class ModalContentDef extends React.Component<ModalContentProps> {
    componentWillMount() {
        window.addEventListener('message', (e) => {
            if (e.data === 'finish-interaction') {
                this.props.finishInteraction();
            }
        });
    }

    componentWillReceiveProps(props: ModalContentProps) {
        // TODO fix it
        if (props.unhandledError) {
            props.goToFormInfo(new ResultFormInfo(ResultType.error));
            props.acceptError();
        }
    }

    render() {
        const {
            activeModal: { name },
            inFrame
        } = this.props;
        return (
            <CSSTransitionGroup
                component="div"
                transitionName="interactionAnimation"
                transitionEnterTimeout={1000}
                transitionLeaveTimeout={500}>
                <div key={name}>
                    {!inFrame && <Close />}
                    {this.renderContent()}
                </div>
            </CSSTransitionGroup>
        );
    }

    renderContent() {
        const {
            activeModal: { name },
            activeModal
        } = this.props;
        switch (name) {
            case ModalName.modalForms:
                return (
                    <>
                        <Modal />
                        <Footer />
                    </>
                );
            case ModalName.modalInteraction:
                return (
                    <>
                        <UserInteractionModal />
                        {(activeModal as ModalInteraction).pollingEvents && (
                            <ModalLoader className={styles.modalInteractionLoader} />
                        )}
                    </>
                );
            default:
                return null;
        }
    }
}

const mapStateToProps = (state: State) => ({
    activeModal: state.modals.find((modal) => modal.active),
    unhandledError: state.error && state.error.status === ErrorStatus.unhandled
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    goToFormInfo: bindActionCreators(goToFormInfo, dispatch),
    acceptError: bindActionCreators(acceptError, dispatch),
    finishInteraction: bindActionCreators(finishInteraction, dispatch)
});

export const ModalContent = connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalContentDef);
