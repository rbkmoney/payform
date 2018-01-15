import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as styles from './layout.scss';
import { Overlay } from './overlay';
import { ModalContainer } from './modal-container';
import { LayoutLoader } from './layout-loader';
import { ModelStatus, State } from 'checkout/state';
import { AppProps } from './app-props';
import { loadConfig, initialize, initModal } from 'checkout/actions';

const mapStateToProps = (state: State) => ({
    config: state.config,
    error: state.error && state.error.error,
    model: state.model,
    modalReady: !!state.modals
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    loadConfig: bindActionCreators(loadConfig, dispatch),
    initModel: bindActionCreators(initialize, dispatch),
    initModal: bindActionCreators(initModal, dispatch)
});

class AppDef extends React.Component<AppProps> {

    componentDidMount() {
        this.props.loadConfig(this.props.config.initConfig.locale);
    }

    componentWillReceiveProps(props: AppProps) {
        const {config, model, modalReady} = props;
        if (config.ready && model.status === ModelStatus.none) {
            props.initModel(props.config);
        }
        if (!modalReady && model.status === ModelStatus.initialized) {
            props.initModal(config.initConfig, model);
        }
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

export const App = connect(mapStateToProps, mapDispatchToProps)(AppDef);
