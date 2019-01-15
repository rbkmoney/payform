import * as React from 'react';

import { Loader } from 'checkout/components';
import styled from 'checkout/styled-components';
import { device } from 'checkout/utils/device';

const LoaderWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    border-radius: 6px;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.9);

    @media ${device.desktop} {
        position: absolute;
    }
`;

export const ModalLoader: React.FC<React.ComponentProps<typeof LoaderWrapper>> = (props) => (
    <LoaderWrapper {...props}>
        <Loader />
    </LoaderWrapper>
);
