import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { Modal } from '../modal';
import { Footer } from '../footer';
import { UserInteractionModal } from '../user-interaction-modal';
import { ModalName, ModalState, State, ModalInteraction } from 'checkout/state';
import { finishInteraction } from 'checkout/actions';
import { ModalLoader } from 'checkout/components/app/modal-container/modal-loader';
import * as styles from 'checkout/components/app/modal-container/modal-container.scss';
import { CSSTransitionGroup } from 'react-transition-group';
import { Close } from 'checkout/components/app/modal-container/modal/close';
import styled from 'checkout/styled-components';
import { device } from 'checkout/utils/device';

const StyledFooter = styled(Footer)`
    @media ${device.mobile} {
        display: none;
    }
`;

export interface ModalContentProps {
    activeModal: ModalState;
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
                        <StyledFooter />
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
    activeModal: state.modals.find((modal) => modal.active)
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    finishInteraction: bindActionCreators(finishInteraction, dispatch)
});

export const ModalContent = connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalContentDef);
