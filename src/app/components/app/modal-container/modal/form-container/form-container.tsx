import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { CardForm } from './card-form';
import { FormName, ModalForms, ModalName, State, SlideDirection, FormInfo, InteractionFormInfo } from 'checkout/state';
import { PaymentMethods } from './payment-methods';
import { FormContainerProps } from './form-container-props';
import { FormLoader } from './form-loader';
import { ResultForm } from './result-form';
import { WalletForm } from './wallet-form';
import { MobileCommerceForm } from './mobile-commerce-form';
import { EurosetForm } from './euroset-form';
import { UzcardForm } from './uzcard-form';
import { QPSForm } from './qps-forms';
import { InteractionForm } from './interaction-form';
import { TokenProviderForm } from './token-provider-form';
import { findNamed } from 'checkout/utils';
import { Help } from './help';
import { setViewInfoHeight } from 'checkout/actions';
import styled, { css } from 'checkout/styled-components';
import { device } from 'checkout/utils/device';
import { shake } from 'checkout/styled-components/animations';
import { stylableTransition, ENTER, LEAVE, ACTIVE } from 'checkout/styled-transition';
import { MobileCommerceReceiptForm } from './mobile-commerce-receipt-form';

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

const slideTransitionTime = '0.5s';

const slideLeftAnimation = css`
    ${ENTER} {
        transform: translateX(-100%);
        opacity: 0;
        transition: all ${slideTransitionTime};

        ${ACTIVE} {
            transform: translateX(0);
            opacity: 1;
        }
    }

    ${LEAVE} {
        transform: translateX(0);
        opacity: 1;
        position: absolute;
        top: 0;
        transition: all ${slideTransitionTime};
        width: 100%;

        ${ACTIVE} {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;

const slideRightAnimation = css`
    ${ENTER} {
        transform: translateX(100%);
        opacity: 0;
        transition: all ${slideTransitionTime};

        ${ACTIVE} {
            transform: translateX(0);
            opacity: 1;
        }
    }

    ${LEAVE} {
        transform: translateX(0);
        opacity: 1;
        position: absolute;
        top: 0;
        transition: all ${slideTransitionTime};
        width: 100%;

        ${ACTIVE} {
            transform: translateX(-100%);
            opacity: 0;
        }
    }
`;

const FormContainerAnimation = styled(stylableTransition)<{ direction: SlideDirection }>`
    height: 100%;
    position: relative;

    form {
        width: 100%;
        display: flex;
        flex-wrap: nowrap;
        flex-direction: column;
        justify-content: space-between;
    }

    ${ENTER},${LEAVE} {
        * {
            pointer-events: none !important;
        }
    }

    ${({ direction }) => (direction === SlideDirection.left ? slideLeftAnimation : slideRightAnimation)}
`;

const mapStateToProps = (state: State): Partial<FormContainerProps> => {
    const modalForms = findNamed(state.modals, ModalName.modalForms) as ModalForms;
    return {
        activeFormInfo: modalForms.formsInfo.find((item) => item.active),
        viewInfo: modalForms.viewInfo
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): Partial<FormContainerProps> => ({
    setViewInfoHeight: bindActionCreators(setViewInfoHeight, dispatch)
});

class FormContainerDef extends React.Component<FormContainerProps> {
    private contentElement: HTMLDivElement;

    componentDidMount() {
        this.setHeight();
        window.addEventListener('resize', this.setHeight);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.setHeight);
    }

    componentDidUpdate(prevProps: FormContainerProps) {
        if (prevProps.activeFormInfo.name !== this.props.activeFormInfo.name) {
            this.setHeight();
        }
    }

    render() {
        const { activeFormInfo, viewInfo } = this.props;
        return (
            <Container>
                <Form error={viewInfo.error} height={viewInfo.height}>
                    <div ref={this.setContentElement}>
                        <FormContainerAnimation
                            component="div"
                            direction={viewInfo.slideDirection}
                            enter={500}
                            leave={500}
                            onTransitionEnd={this.setHeight}>
                            {this.renderForm(activeFormInfo)}
                        </FormContainerAnimation>
                        {viewInfo.inProcess && <FormLoader />}
                    </div>
                </Form>
            </Container>
        );
    }

    private renderForm = (info: FormInfo): React.ReactNode => {
        const { name } = info;
        switch (name) {
            case FormName.paymentMethods:
                return <PaymentMethods key={name} />;
            case FormName.cardForm:
                return <CardForm key={name} />;
            case FormName.walletForm:
                return <WalletForm key={name} />;
            case FormName.eurosetForm:
                return <EurosetForm key={name} />;
            case FormName.uzcardForm:
                return <UzcardForm key={name} />;
            case FormName.qpsForm:
                return <QPSForm key={name} />;
            case FormName.resultForm:
                return <ResultForm key={name} />;
            case FormName.helpForm:
                return <Help key={name} />;
            case FormName.interactionForm:
                const {
                    interaction: { interactionType }
                } = info as InteractionFormInfo;
                return <InteractionForm key={`${name}-${interactionType}`} />;
            case FormName.tokenProviderForm:
                return <TokenProviderForm key={name} />;
            case FormName.mobileCommerceForm:
                return <MobileCommerceForm key={name} />;
            case FormName.mobileCommerceReceiptForm:
                return <MobileCommerceReceiptForm key={name} />;
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

export const FormContainer = connect(mapStateToProps, mapDispatchToProps)(FormContainerDef);
