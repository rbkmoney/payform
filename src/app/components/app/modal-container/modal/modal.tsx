import * as React from 'react';
import { connect } from 'react-redux';
import * as CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import * as styles from './modal.scss';
import { Info } from './info';
import { Footer } from '../footer';
import { MobileHeader } from './mobile-header';
import { FormContainer } from './form-container';
import { State } from 'checkout/state';
import styled, { css } from 'checkout/styled-components';
import { device } from 'checkout/utils/device';

const FormBlock = styled.div<{ inFrame: boolean }>`
    position: relative;
    height: 100%;
    min-height: 100%;
    width: 100%;
    background-image: linear-gradient(
        45deg,
        ${({ theme }) => theme.color.secondary[1]} 0%,
        ${({ theme }) => theme.color.secondary[0.9]} 100%
    );

    footer {
        display: block;
    }

    @media ${device.mobile} {
        height: auto;
        min-height: auto;
        width: 680px;
        border-radius: 6px;
        display: flex;
        flex-wrap: nowrap;
        flex-direction: row;
        padding: 30px;
        box-sizing: border-box;
        background-image: linear-gradient(
            45deg,
            ${({ theme }) => theme.color.secondary[1]} -20%,
            ${({ theme }) => theme.color.secondary[0.9]} 90%
        );

        footer {
            display: none !important;
        }
    }

    ${({ theme, inFrame }) =>
        inFrame &&
        css`
            box-shadow: 0 15px 49px 0 ${theme.color.secondary[0.7]};
        `};
`;

interface ModalDefProps {
    inFrame: boolean;
}

const ModalDef: React.FC<ModalDefProps> = (props) => (
    <CSSTransitionGroup
        component="div"
        transitionName={{
            appear: styles.appearFormContainer,
            enter: styles.enterFormContainer,
            leave: styles.leaveFormContainer
        }}
        transitionEnterTimeout={1000}
        transitionLeaveTimeout={1000}
        transitionAppearTimeout={1000}
        transitionAppear={true}
        transitionEnter={true}
        transitionLeave={true}>
        <FormBlock id="form-container" inFrame={props.inFrame}>
            <MobileHeader />
            <Info />
            <FormContainer />
            <Footer />
        </FormBlock>
    </CSSTransitionGroup>
);

const mapStateToProps = (state: State) => ({
    inFrame: state.config.inFrame
});

export const Modal = connect(mapStateToProps)(ModalDef);
