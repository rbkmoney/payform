import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { Modal } from '../modal';
import { Footer } from '../footer';
import { UserInteractionModal } from '../user-interaction-modal';
import { ModalName, ModalState, State, ModalInteraction } from 'checkout/state';
import { finishInteraction } from 'checkout/actions';
import { ModalLoader } from 'checkout/components/app/modal-container/modal-loader';
import { Close } from 'checkout/components/app/modal-container/modal/close';
import styled from 'checkout/styled-components';
import { device } from 'checkout/utils/device';
import { stylableTransition, LEAVE, ENTER, ACTIVE } from 'checkout/styled-transition';

const interactionTransitionTime = '0.5s';

const Animation = styled(stylableTransition)`
    ${ENTER} {
        opacity: 0;

        @media ${device.desktop} {
            opacity: 1;
            transform: perspective(1000px) rotateY(90deg);
        }

        ${ACTIVE} {
            opacity: 1;
            transition: all ${interactionTransitionTime} ease-out;

            @media ${device.desktop} {
                transform: perspective(1000px) rotateY(0deg);
                transition-delay: ${interactionTransitionTime};
            }
        }
    }

    ${LEAVE} {
        opacity: 1;

        @media ${device.desktop} {
            transform: translateY(-50%) perspective(1000px) rotateY(0deg);
            position: absolute;
            top: 50%;
        }

        ${ACTIVE} {
            opacity: 0;
            transition: all ${interactionTransitionTime} ease-in;

            @media ${device.desktop} {
                opacity: 1;
                top: 50%;
                transform: translateY(-50%) perspective(1000px) rotateY(-90deg);
            }
        }
    }
`;

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
    UNSAFE_componentWillMount() {
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
            <Animation enter={1000} leave={500}>
                <div key={name}>
                    {!inFrame && <Close />}
                    {this.renderContent()}
                </div>
            </Animation>
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
                        {(activeModal as ModalInteraction).pollingEvents && <ModalLoader />}
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
