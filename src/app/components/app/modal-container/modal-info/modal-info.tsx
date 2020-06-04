import * as React from 'react';
import { connect } from 'react-redux';

import { Footer } from '../footer';
import { MobileHeader } from '../modal/mobile-header';
import { Info } from './info';
import { State } from 'checkout/state';
import { FormBlock } from '../modal/form-block';
import { stylableTransition, APPEAR, ENTER, LEAVE } from 'checkout/styled-transition';
import styled from 'checkout/styled-components';
import { device } from 'checkout/utils/device';
import { rotatein, rotateout } from 'checkout/styled-components/animations';

const RotateAnimation = styled(stylableTransition)`
    ${APPEAR} {
        @media ${device.desktop} {
            animation: ${rotatein} 0s;
        }
    }

    ${ENTER} {
        background: green;
    }

    ${LEAVE} {
        @media ${device.desktop} {
            animation: ${rotateout} 0s;
        }
    }
`;

interface ModalInfoDefProps {
    inFrame: boolean;
}

const ModalInfoDef: React.FC<ModalInfoDefProps> = (props) => (
    <RotateAnimation enter={1000} leave={1000} appear={1000}>
        <FormBlock id="form-container" inFrame={props.inFrame}>
            <MobileHeader />
            <Info />
            <Footer />
        </FormBlock>
    </RotateAnimation>
);

const mapStateToProps = (state: State) => ({
    inFrame: state.config.inFrame
});

export const ModalInfo = connect(mapStateToProps)(ModalInfoDef);
