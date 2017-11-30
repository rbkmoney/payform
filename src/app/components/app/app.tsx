import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as styles from './layout.scss';
import { Overlay } from './overlay';
import { ModalContainer } from './modal-container';
import { LayoutLoader } from './layout-loder';
import { InvoiceTemplateInitConfig } from 'checkout/config';
import {
    State,
    ConfigState,
    ModelState,
    InitializationStage
} from 'checkout/state';
import {
    getAppConfigAction,
    GetAppConfigDispatch,
    getInvoiceTemplateAction,
    GetInvoiceTemplateDispatch,
    InitStageDoneAction,
    setInitStageDone
} from 'checkout/actions';

interface AppProps {
    getAppConfig: () => GetAppConfigDispatch;
    getInvoiceTemplate: (capiEndpoint: string, accessToken: string, invoiceTemplateID: string) => GetInvoiceTemplateDispatch;
    setInitStageDone: () => InitStageDoneAction;
    config: ConfigState;
    model: ModelState;
    initialization: InitializationStage;
}

const mapStateToProps = (state: State) => ({
    config: state.config,
    model: state.model,
    initialization: state.lifecycle.initialization
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    getAppConfig: bindActionCreators(getAppConfigAction, dispatch),
    getInvoiceTemplate: bindActionCreators(getInvoiceTemplateAction, dispatch),
    setInitStageDone: bindActionCreators(setInitStageDone, dispatch)
});

const manageInitStage = (props: AppProps) => {
    const initStage = props.initialization;
    if (initStage.appConfigReceived && !initStage.modelReceived) {
        const config = props.config.initConfig as InvoiceTemplateInitConfig;
        props.getInvoiceTemplate(
            props.config.appConfig.capiEndpoint,
            config.invoiceTemplateAccessToken,
            config.invoiceTemplateID
        );
    } else if (initStage.modelReceived && !initStage.stageDone) {
        props.setInitStageDone();
    }
};

class AppDef extends React.Component<AppProps> {

    constructor(props: AppProps) {
        super(props);
    }

    componentDidMount() {
        this.props.getAppConfig();
    }

    componentWillReceiveProps(props: AppProps) {
        manageInitStage(props);
    }

    render() {
        const initStageDone = this.props.initialization.stageDone;
        return (
            <div className={styles.layout}>
                <Overlay/>
                {initStageDone ? <ModalContainer/> : <LayoutLoader/>}
            </div>
        );
    }
}

export const App = connect(mapStateToProps, mapDispatchToProps)(AppDef);
