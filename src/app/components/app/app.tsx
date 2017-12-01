import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as styles from './layout.scss';
import { Overlay } from './overlay';
import { ModalContainer } from './modal-container';
import { LayoutLoader } from './layout-loder';
import { manageInitStage } from './manage-init-stage';
import { State, ConfigState, ModelState, InitializationStage } from 'checkout/state';
import { GetAppConfigDispatch, getAppConfigAction } from 'checkout/actions';
import { GetInvoiceTemplateDispatch, getInvoiceTemplateAction } from 'checkout/actions';
import { GetInvoiceDispatch, getInvoiceAction } from 'checkout/actions';
import { InitStageDoneAction, setInitStageDone } from 'checkout/actions';
import { InitStageStartAction, setInitStageStart } from 'checkout/actions';

export interface AppProps {
    getAppConfig: () => GetAppConfigDispatch;
    getInvoiceTemplate: (capiEndpoint: string, accessToken: string, invoiceTemplateID: string) => GetInvoiceTemplateDispatch;
    getInvoice: (capiEndpoint: string, accessToken: string, invoiceID: string) => GetInvoiceDispatch;
    setInitStageStart: () => InitStageStartAction;
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
    getInvoice: bindActionCreators(getInvoiceAction, dispatch),
    setInitStageStart: bindActionCreators(setInitStageStart, dispatch),
    setInitStageDone: bindActionCreators(setInitStageDone, dispatch)
});

class AppDef extends React.Component<AppProps> {

    constructor(props: AppProps) {
        super(props);
    }

    componentDidMount() {
        this.props.setInitStageStart();
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
