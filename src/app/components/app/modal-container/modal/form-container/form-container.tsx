import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { CSSTransitionGroup } from 'react-transition-group';

import { CardForm } from './card-form';
import { FormName, ModalForms, ModalName, State } from 'checkout/state';
import { PaymentMethods } from './payment-methods';
import { FormContainerProps } from './form-container-props';
import { FormLoader } from './form-loader';
import { ResultForm } from './result-form';
import { WalletForm } from './wallet-form';
import { TerminalForm } from './terminal-form';
import { InteractionForm } from './interaction-form';
import { TokenProviderForm } from './token-provider-form';
import { findNamed } from 'checkout/utils';
import { Help } from './help';
import { setViewInfoHeight } from 'checkout/actions';
import styled, { css } from 'checkout/styled-components';
import { device } from 'checkout/utils/device';
import { shake } from 'checkout/styled-components/animations';

const Container = styled.div`
    padding: 0 5px;

    @media ${device.desktop} {
        width: 360px;
        padding: 0;
    }
`;

const Form = styled.div<{ error?: any; height?: number }>`
    background: #fff;
    border-radius: 6px;
    box-shadow: 0 2px 24px 0 rgba(0, 0, 0, 0.25);
    padding: 30px 20px;
    position: relative;
    overflow: hidden;
    transition: height 0.4s;
    height: ${({ height }) => (height ? `${height}px` : 'auto')};

    @media ${device.desktop} {
        padding: 30px;
        min-height: auto;
    }

    ${({ error }) =>
        error &&
        css`
            animation: ${shake} 0.82s;
        `}
`;

const AnimationFormContainer = styled(CSSTransitionGroup)`
    height: 100%;
    position: relative;

    form {
        width: 100%;
        display: flex;
        flex-wrap: nowrap;
        flex-direction: column;
        justify-content: space-between;
    }
`;

const mapStateToProps = (state: State) => {
    const modalForms = findNamed(state.modals, ModalName.modalForms) as ModalForms;
    return {
        activeFormInfo: modalForms.formsInfo.find((item) => item.active),
        viewInfo: modalForms.viewInfo
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setViewInfoHeight: bindActionCreators(setViewInfoHeight, dispatch)
});

class FormContainerDef extends React.Component<FormContainerProps> {
    private contentElement: HTMLDivElement;

    componentDidMount() {
        this.setHeight();
    }

    componentDidUpdate(prevProps: FormContainerProps) {
        if (prevProps.activeFormInfo.name !== this.props.activeFormInfo.name) {
            this.setHeight();
        }
    }

    render() {
        const {
            activeFormInfo: { name },
            viewInfo
        } = this.props;
        return (
            <Container>
                <Form error={viewInfo.error} height={viewInfo.height}>
                    <div ref={this.setContentElement}>
                        <AnimationFormContainer
                            component="div"
                            transitionName={viewInfo.slideDirection}
                            transitionEnterTimeout={500}
                            transitionLeaveTimeout={500}
                            onTransitionEnd={this.setHeight}>
                            <div key={name}>{this.renderForm(name)}</div>
                        </AnimationFormContainer>
                        {viewInfo.inProcess && <FormLoader />}
                    </div>
                </Form>
            </Container>
        );
    }

    private renderForm = (name: FormName): React.ReactNode => {
        switch (name) {
            case FormName.paymentMethods:
                return <PaymentMethods />;
            case FormName.cardForm:
                return <CardForm />;
            case FormName.walletForm:
                return <WalletForm />;
            case FormName.terminalForm:
                return <TerminalForm />;
            case FormName.resultForm:
                return <ResultForm />;
            case FormName.helpForm:
                return <Help />;
            case FormName.interactionForm:
                return <InteractionForm />;
            case FormName.tokenProviderForm:
                return <TokenProviderForm />;
            default:
                return null;
        }
    };

    private setContentElement = (element: HTMLDivElement) => {
        this.contentElement = element;
    };

    private setHeight = () => {
        const height = this.contentElement ? this.contentElement.clientHeight : 0;
        if (height !== this.props.viewInfo.height) {
            this.props.setViewInfoHeight(height);
        }
    };
}

export const FormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(FormContainerDef);
