import * as React from 'react';

import { Loader } from '../../ui/loader';
import styled from 'checkout/styled-components';
import { device } from 'checkout/utils/device';
import { growth } from 'checkout/styled-components/animations';

export const LayoutLoader = styled((props) => (
    <div {...props}>
        <Loader />
    </div>
))`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    @media ${device.desktop} {
        position: relative;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        display: flex;
        flex-wrap: nowrap;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        transform: translate(0, 0);
        animation: ${growth} 0.75s;
    }
`;
