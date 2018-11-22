import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { Overlay } from './overlay';
import { ModalContainer } from './modal-container';
import { LayoutLoader } from './layout-loader';
import { AppProps } from './app-props';
import { State } from 'checkout/state';
import { initializeApp } from 'checkout/actions';
import { ThemeProvider } from 'checkout/styled-components';
import { DEFAULT_THEME } from 'checkout/themes';
import styled from 'checkout/styled-components';
import { createGlobalStyle } from 'checkout/styled-components';
import { device } from 'checkout/utils/device';

const GlobalStyle = createGlobalStyle`
    body,
    html,
    #app {
        margin: 0;
        position: relative;
        height: auto;
        min-height: 100%;
        width: 100%;
        min-width: 320px;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

        &._loading {
            height: 100%;
        }

        @media ${device.mobile} {
            height: 100%;
            min-width: 680px;
        }

        @media (min-height: 701px) and ${device.mobile} {
            overflow-y: hidden;
        }
    }
`;

const AppWrapper = styled.div`
    position: relative;
    height: 100%;
    min-height: 100%;
    width: 100%;

    &,
    * {
        font-family: ${({ theme }) => theme.font.family};
    }

    @media ${device.mobile} {
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

class AppDef extends React.Component<AppProps> {
    componentWillMount() {
        this.props.initApp(this.props.initConfig);
    }

    render() {
        const { initialized, error } = this.props.initializeApp;
        return (
            <ThemeProvider theme={this.props.theme || DEFAULT_THEME}>
                <>
                    <GlobalStyle />
                    <AppWrapper>
                        <Overlay />
                        {initialized || error ? <ModalContainer /> : <LayoutLoader />}
                    </AppWrapper>
                </>
            </ThemeProvider>
        );
    }
}

const mapStateToProps = (state: State) => ({
    initConfig: state.config.initConfig,
    theme: state.config.theme,
    initializeApp: state.initializeApp
});

const mapDispatchToProps = (dispatch: Dispatch<State>) => ({
    initApp: bindActionCreators(initializeApp, dispatch)
});

export const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppDef);
