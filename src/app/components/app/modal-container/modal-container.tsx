import * as React from 'react';
import { connect } from 'react-redux';

import { State, ResultState, InitializeAppState } from 'checkout/state';
import { Config } from 'checkout/config';
import { ModalContent } from './modal-content';
import { ModalError } from './modal-error';
import styled from 'checkout/styled-components';
import { device } from 'checkout/utils/device';
import { fadein, fadeout, popup, popout } from 'checkout/styled-components/animations';
import { stylableTransition, APPEAR, ENTER, LEAVE, ACTIVE } from 'checkout/styled-transition';

const Animation = styled(stylableTransition)`
    ${APPEAR} {
        animation: ${fadein} 0.75s;

        @media ${device.desktop} {
            animation-name: ${popup};
        }
    }

    ${ENTER} {
        background: transparent;
    }

    ${LEAVE} {
        animation: ${fadeout} 0.75s;

        @media ${device.desktop} {
            animation-name: ${popout};
        }

        ${ACTIVE} {
            opacity: 0;
        }
    }
`;

const Container = styled.div`
    height: 100%;
    position: relative;
`;

export interface ModalContainerProps {
    config: Config;
    result: ResultState;
    initializeApp: InitializeAppState;
}

class ModalContainerDef extends React.Component<ModalContainerProps> {
    render() {
        const {
            config: { inFrame },
            result,
            initializeApp: { error }
        } = this.props;
        return (
            <Animation enter={750} appear={750} leave={750}>
                {result !== ResultState.close && result !== ResultState.closeAfterDone && (
                    <Container>
                        {error ? <ModalError inFrame={inFrame} error={error} /> : <ModalContent inFrame={inFrame} />}
                    </Container>
                )}
            </Animation>
        );
    }
}

const mapStateToProps = (state: State) => ({
    config: state.config,
    result: state.result,
    initializeApp: state.initializeApp
});

export const ModalContainer = connect(mapStateToProps)(ModalContainerDef);
