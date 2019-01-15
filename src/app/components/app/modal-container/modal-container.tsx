import * as React from 'react';
import { connect } from 'react-redux';
import { CSSTransitionGroup } from 'react-transition-group';

import * as styles from './modal-container.scss';
import { State, ResultState, InitializeAppState } from 'checkout/state';
import { Config } from 'checkout/config';
import { ModalContent } from './modal-content';
import { ModalError } from './modal-error';
import styled from 'checkout/styled-components';

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
            <CSSTransitionGroup
                component="div"
                transitionName={{
                    appear: styles.appearContainer,
                    enter: styles.enterContainer,
                    leave: styles.leaveContainer,
                    leaveActive: styles.leaveActiveContainer
                }}
                transitionEnterTimeout={750}
                transitionLeaveTimeout={750}
                transitionAppearTimeout={750}
                transitionAppear={true}
                transitionEnter={true}
                transitionLeave={true}>
                {result !== ResultState.close && result !== ResultState.closeAfterDone && (
                    <Container>
                        {error ? <ModalError inFrame={inFrame} error={error} /> : <ModalContent inFrame={inFrame} />}
                    </Container>
                )}
            </CSSTransitionGroup>
        );
    }
}

const mapStateToProps = (state: State) => ({
    config: state.config,
    result: state.result,
    initializeApp: state.initializeApp
});

export const ModalContainer = connect(mapStateToProps)(ModalContainerDef);
