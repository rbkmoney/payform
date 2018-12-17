import styled from 'checkout/styled-components';
import { device } from 'checkout/utils/device';

export const AppWrapper = styled.div`
    position: relative;
    height: 100%;
    min-height: 100%;
    width: 100%;

    @media ${device.desktop} {
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
        height: auto;
        padding: 45px 0;
        box-sizing: border-box;
    }
`;
