import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as styles from './layout.scss';

import { Overlay } from './overlay';
import { ModalContainer } from './modal-container';
import { LayoutLoader } from './layout-loader';
import { AppProps } from './app-props';
import { State } from 'checkout/state';
import { initializeApp } from 'checkout/actions';
import { ThemeProvider } from 'checkout/styled-components';
import { DEFAULT_THEME } from 'checkout/themes';

class AppDef extends React.Component<AppProps> {
    componentWillMount() {
        this.props.initApp(this.props.initConfig);
    }

    render() {
        const { initialized, error } = this.props.initializeApp;
        return (
            <ThemeProvider theme={this.props.theme || DEFAULT_THEME}>
                <div className={styles.layout}>
                    <Overlay />
                    {initialized || error ? <ModalContainer /> : <LayoutLoader />}
                </div>
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
