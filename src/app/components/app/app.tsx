import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import get from 'lodash-es/get';

import { Overlay } from './overlay';
import { ModalContainer } from './modal-container';
import { LayoutLoader } from './layout-loader';
import { AppProps } from './app-props';
import { State } from 'checkout/state';
import { initializeApp } from 'checkout/actions';
import { ThemeProvider } from 'checkout/styled-components';
import { DEFAULT_THEME, themes } from 'checkout/themes';
import { AppWrapper } from 'checkout/components/app/app-wrapper';
import { GlobalStyle } from 'checkout/components/app/global-style';

class AppDef extends React.Component<AppProps> {
    componentWillMount() {
        this.props.initApp(this.props.initConfig);
    }

    render() {
        const { initialized, error } = this.props.initializeApp;
        return (
            <ThemeProvider theme={get(themes, this.props.fixedTheme || this.props.theme, DEFAULT_THEME)}>
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
    theme: state.config.initConfig.theme,
    fixedTheme: get(state.config, 'appConfig.fixedTheme'),
    initializeApp: state.initializeApp
});

const mapDispatchToProps = (dispatch: Dispatch<State>) => ({
    initApp: bindActionCreators(initializeApp, dispatch)
});

export const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppDef);
