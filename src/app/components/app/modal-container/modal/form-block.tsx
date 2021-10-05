import styled from 'checkout/styled-components';
import { device } from 'checkout/utils/device';

export const FormBlock = styled.div<{ inFrame: boolean }>`
    position: relative;
    height: 100%;
    min-height: 100vh;
    width: 100%;
    background-image: ${({ theme }) => theme.gradients.form};

    footer {
        display: block;
    }

    @media ${device.desktop} {
        height: auto;
        min-height: auto;
        width: 680px;
        border-radius: 6px;
        display: flex;
        flex-wrap: nowrap;
        flex-direction: row;
        padding: 30px;
        box-sizing: border-box;
        background-image: ${({ theme }) => theme.gradients.form};

        footer {
            display: none !important;
        }
    }
`;
