import * as React from 'react';
import { Close } from 'checkout/components/app/modal-container/modal/close';
import styled from 'checkout/styled-components';
import { device } from 'checkout/utils/device';

const ModalErrorWrapper = styled.div`
    position: fixed;
    height: 100%;
    width: 100%;
    background: #fff;
    padding: 50px 60px 60px;
    box-sizing: border-box;

    @media ${device.desktop} {
        max-height: 690px;
        width: 680px;
        position: relative;
        border-radius: 6px;
    }
`;

const Title = styled.h2`
    font-size: 16px;
    text-align: center;
    font-weight: 500;
    margin: 0;
    color: ${({ theme }) => theme.color.error[1]};
`;

const Message = styled.p`
    margin: 0;
    padding-top: 25px;
    font-size: 16px;
    color: ${({ theme }) => theme.color.neutral[0.8]};
`;

interface ModalErrorProps {
    inFrame: boolean;
    error?: { message?: string; code?: string };
}

export const ModalError: React.FC<ModalErrorProps> = ({ error, inFrame }) => {
    const errorMessage = error && (error.message || error.code);
    return (
        <ModalErrorWrapper>
            {!inFrame && <Close />}
            <Title>Initialization failure</Title>
            {errorMessage && (
                <Message>
                    {error.code && error.message ? (
                        <>
                            {error.code}
                            <br />
                            {error.message}
                        </>
                    ) : (
                        errorMessage
                    )}
                </Message>
            )}
        </ModalErrorWrapper>
    );
};
