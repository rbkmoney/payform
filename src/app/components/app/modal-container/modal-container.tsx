import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import * as CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { connect } from 'react-redux';
import * as styles from './modal-container.scss';
import { Modal } from './modal';
import { Footer } from './footer';
import { setFormFlowAction, SetFormsFlowAction } from 'checkout/actions';
import { finishInteraction, FormFlowItem, FormName, getActive } from 'checkout/form-flow';
import { UserInteractionModal } from './user-interaction-modal';
import { State } from 'checkout/state';
import { Event } from 'checkout/backend';

export interface ModalContainerProps {
    formsFlow: FormFlowItem[];
    invoiceEvents: Event[];
    setFormFlow: (formFlow: FormFlowItem[]) => SetFormsFlowAction;
}

class ModalContainerDef extends React.Component<ModalContainerProps> {

    componentWillMount() {
        window.addEventListener('message', (e) => e.data === 'finish-interaction'
            ? this.props.setFormFlow(finishInteraction(this.props.formsFlow))
            : null);
    }

    render() {
        const {formName} = getActive(this.props.formsFlow);
        return (
            <CSSTransitionGroup
                component='div'
                transitionName={{
                    appear: styles.appearContainer,
                    enter: styles.enterContainer,
                    leave: styles.leaveContainer
                }}
                transitionEnterTimeout={1000}
                transitionLeaveTimeout={950}
                transitionAppearTimeout={1000}
                transitionAppear={true}
                transitionEnter={true}
                transitionLeave={true}
            >
                <div className={styles.container}>
                    {formName !== FormName.modalInteraction ? <Modal/> : null}
                    {formName !== FormName.modalInteraction ? <Footer/> : null}
                    {formName === FormName.modalInteraction ? <UserInteractionModal/> : null}
                </div>
            </CSSTransitionGroup>
        );
    }
}

const mapStateToProps = (state: State) => ({
    formsFlow: state.formsFlow,
    invoiceEvents: state.model.invoiceEvents
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setFormFlow: bindActionCreators(setFormFlowAction, dispatch)
});

export const ModalContainer = connect(mapStateToProps, mapDispatchToProps)(ModalContainerDef);
