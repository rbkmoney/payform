import * as React from 'react';
import { connect } from 'react-redux';
import get from 'lodash-es/get';

import {
    EventInteractionObject,
    ModalInteraction,
    ModalInteractionType,
    ModalName,
    State,
    TokenizedInteractionObject
} from 'checkout/state';
import { findNamed } from 'checkout/utils';
import { prepareForm } from './interaction-form';
import styled from 'checkout/styled-components';
import { device } from 'checkout/utils/device';

const Container = styled.div`
    height: 100%; // for cross-browser 100vh
    height: 100vh;
    width: 100%;
    background: #fff;

    @media ${device.desktop} {
        height: 690px;
        width: 680px;
        position: relative;
        border-radius: 6px;
        overflow: hidden;
    }
`;

const IFrame = styled.iframe`
    display: block;
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: scroll;
    border: none;

    @media ${device.desktop} {
        border-radius: 6px;
        position: absolute;
    }
`;

export interface UserInteractionModalProps {
    modal: ModalInteraction;
    origin: string;
}

class UserInteractionModalDef extends React.Component<UserInteractionModalProps> {
    private iFrameElement: HTMLIFrameElement;

    componentDidMount() {
        const {
            origin,
            modal: { interactionObject }
        } = this.props;
        if (interactionObject.type === ModalInteractionType.EventInteraction) {
            const form = prepareForm(origin, (interactionObject as EventInteractionObject).request);
            this.iFrameElement.contentWindow.document.body.appendChild(form);
            form.submit();
        }
    }

    render() {
        const interactionObject = get(this.props.modal, 'interactionObject');
        let src: string;
        if (interactionObject && interactionObject.type === ModalInteractionType.TokenizedInteraction) {
            src = (interactionObject as TokenizedInteractionObject).uri;
        }
        return (
            <Container key="3ds" id="interact-container">
                <IFrame id="interactionFrame" ref={this.setIFrameElement} src={src} />
            </Container>
        );
    }

    private setIFrameElement = (element: HTMLIFrameElement) => {
        this.iFrameElement = element;
    };
}

const mapStateToProps = (state: State) => ({
    modal: findNamed(state.modals, ModalName.modalInteraction),
    origin: state.config.origin
});

export const UserInteractionModal = connect(mapStateToProps)(UserInteractionModalDef);
