import * as React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';

import { appear, leave } from './form-loader.scss';
import { Loader } from 'checkout/components';
import styled from 'checkout/styled-components';

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
    <CSSTransitionGroup
        transitionName={{ enter: null, appear, leave }}
        transitionEnter={false}
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionLeaveTimeout={200}>
        <LoaderWrapper key="form-loader" id="form-loader">
            <Loader />
        </LoaderWrapper>
    </CSSTransitionGroup>
);
