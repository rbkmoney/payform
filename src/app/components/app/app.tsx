import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as styles from './layout.scss';
import { Overlay } from './overlay';
import { ModalContainer } from './modal-container';
import { State, ConfigState, ResultState, ModelState } from 'checkout/state';
import {
    getAppConfigAction,
    GetAppConfigDispatch,
    getInvoiceTemplateAction,
    GetInvoiceTemplateDispatch
} from 'checkout/actions';
import { InvoiceTemplateInitConfig } from 'checkout/config';

interface AppProps {
    getAppConfig: () => GetAppConfigDispatch;
    getInvoiceTemplate: (capiEndpoint: string, accessToken: string, invoiceTemplateID: string) => GetInvoiceTemplateDispatch;
    config: ConfigState;
    result: ResultState;
    model: ModelState;
}

const mapStateToProps = (state: State) => ({
    config: state.config,
    result: state.result,
    model: state.model
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
        if (props.config.appConfig && !props.model) {
            const config = props.config.initConfig as InvoiceTemplateInitConfig;
            props.getInvoiceTemplate(
                props.config.appConfig.capiEndpoint,
                config.invoiceTemplateAccessToken,
                config.invoiceTemplateID
            );
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
