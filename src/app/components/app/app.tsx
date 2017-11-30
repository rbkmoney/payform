import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as styles from './layout.scss';
import { Overlay } from './overlay';
import { ModalContainer } from './modal-container';
import { InvoiceTemplateInitConfig } from 'checkout/config';
import {
    State,
    ConfigState,
    ResultState,
    ModelState,
    InitializationStage
} from 'checkout/state';
import {
    getAppConfigAction,
    GetAppConfigDispatch,
    getInvoiceTemplateAction,
    GetInvoiceTemplateDispatch
} from 'checkout/actions';

interface AppProps {
    getAppConfig: () => GetAppConfigDispatch;
    getInvoiceTemplate: (capiEndpoint: string, accessToken: string, invoiceTemplateID: string) => GetInvoiceTemplateDispatch;
    config: ConfigState;
    result: ResultState;
    model: ModelState;
    initialization: InitializationStage;
}

const mapStateToProps = (state: State) => ({
    config: state.config,
    result: state.result,
    model: state.model,
    initialization: state.lifecycle.initialization
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    getAppConfig: bindActionCreators(getAppConfigAction, dispatch),
    getInvoiceTemplate: bindActionCreators(getInvoiceTemplateAction, dispatch)
});

class AppDef extends React.Component<AppProps> {

    constructor(props: AppProps) {
        super(props);
    }

    componentDidMount() {
        this.props.getAppConfig();
    }

    componentWillReceiveProps(props: AppProps) {
        if (props.initialization.appConfigReceived && !props.initialization.modelReceived) {
            const config = props.config.initConfig as InvoiceTemplateInitConfig;
            props.getInvoiceTemplate(
                props.config.appConfig.capiEndpoint,
                config.invoiceTemplateAccessToken,
                config.invoiceTemplateID
            );
        }
        if (props.initialization.modelReceived) {

        }
    }

    render() {
        return (
            <div className={styles.layout}>
                <Overlay/>
                {/*<LayoutLoader/>*/}
                <ModalContainer/>
            </div>
        );
    }
}

export const App = connect(mapStateToProps, mapDispatchToProps)(AppDef);
