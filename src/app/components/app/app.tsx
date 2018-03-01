import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as styles from './layout.scss';
import { Overlay } from './overlay';
import { ModalContainer } from './modal-container';
import { LayoutLoader } from './layout-loader';
import { ModelStatus, State } from 'checkout/state';
import { AppProps } from './app-props';
import { initialize, initModal, checkInitConfigCapability, loadConfigAction, initializeApp } from 'checkout/actions';

const mapStateToProps = (state: State) => ({
    config: state.config,
    error: state.error && state.error.error,
    model: state.model,
    modalReady: !!state.modals
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    loadConfig: bindActionCreators(loadConfigAction, dispatch),
    initModel: bindActionCreators(initialize, dispatch),
    initModal: bindActionCreators(initModal, dispatch),
    checkInitConfigCapability: bindActionCreators(checkInitConfigCapability, dispatch),
    initializeApp: bindActionCreators(initializeApp, dispatch)
});

class AppDef extends React.Component<AppProps> {

    componentWillMount() {
        // this.props.loadConfig(this.props.config.initConfig.locale);
        this.props.initializeApp(this.props.config.initConfig);
    }

    // componentWillReceiveProps(props: AppProps) {
    //     const {config, model, error} = props;
    //     if (config.ready && model.status === ModelStatus.none && !error) {
    //         props.initModel(config);
    //     }
    //     const {config: {initConfig}, modalReady} = props;
    //     if (model.status === ModelStatus.initialized && !initConfig.checked) {
    //         props.checkInitConfigCapability(initConfig, model);
    //     }
    //     if (!modalReady && initConfig.checked) {
    //         props.initModal(initConfig, model);
    //     }
    // }

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

export const App = connect(mapStateToProps, mapDispatchToProps)(AppDef);
