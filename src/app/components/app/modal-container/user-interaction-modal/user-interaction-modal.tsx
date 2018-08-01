import * as React from 'react';
import { connect } from 'react-redux';
import * as styles from './user-interaction-modal.scss';
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
        const {
            modal: { interactionObject }
        } = this.props;
        let src: string;
        if (interactionObject.type === ModalInteractionType.TokenizedInteraction) {
            src = (interactionObject as TokenizedInteractionObject).uri;
        }
        return (
            <div className={styles.container} key="3ds" id="interact-container">
                <iframe id="interactionFrame" ref={this.setIFrameElement} src={src} />
            </div>
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
