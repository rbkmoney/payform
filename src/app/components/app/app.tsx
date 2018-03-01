import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as styles from './layout.scss';
import { Overlay } from './overlay';
import { ModalContainer } from './modal-container';
import { LayoutLoader } from './layout-loader';
import { State } from 'checkout/state';
import { AppProps } from './app-props';
import { initializeApp } from 'checkout/actions';

class AppDef extends React.Component<AppProps> {

    componentWillMount() {
        this.props.initApp(this.props.initConfig);
    }

    render() {
        const {modalReady, error} = this.props;
        return (
            <div className={styles.layout}>
                <Overlay/>
                {!modalReady && error ? <div>{error.message}</div> : false}
                {!modalReady && !error ? <LayoutLoader/> : false}
                {modalReady ? <ModalContainer/> : false}
            </div>
        );
    }
}

const mapStateToProps = (state: State) => ({
    initConfig: state.config.initConfig,
    error: state.error && state.error.error,
    modalReady: !!state.modals
});

const mapDispatchToProps = (dispatch: Dispatch<State>) => ({
    initApp: bindActionCreators(initializeApp, dispatch)
});

export const App = connect(mapStateToProps, mapDispatchToProps)(AppDef);
