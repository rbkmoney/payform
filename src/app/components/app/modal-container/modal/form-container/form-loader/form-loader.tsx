import * as React from 'react';

import { Loader } from 'checkout/components';
import styled from 'checkout/styled-components';
import { stylableTransition, APPEAR, LEAVE } from 'checkout/styled-transition';
import { fadein, fadeout } from 'checkout/styled-components/animations';

const Animation = styled(stylableTransition)`
    ${APPEAR} {
        animation: ${fadein} 0.5s;
    }

    ${LEAVE} {
        animation: ${fadeout} 0.2s;
    }
`;

const LoaderWrapper = styled.div`
    position: absolute;
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
`;

export const FormLoader: React.FC = () => (
    <Animation appear={500} leave={200}>
        <LoaderWrapper key="form-loader" id="form-loader">
            <Loader />
        </LoaderWrapper>
    </Animation>
);
