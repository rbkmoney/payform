import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as styles from './layout.scss';
import { Overlay } from './overlay';
import { ModalContainer } from './modal-container';
import { LayoutLoader } from './layout-loder';
import { manageInitStage } from './manage-init-stage';
import { State } from 'checkout/state';
import { AppProps } from './app-props';
import { initFormsFlow } from './init-forms-flow';
import {
    getAppConfigAction,
    getInvoiceTemplateAction,
    getInvoicePaymentMethodsAction,
    getInvoicePaymentMethodsByTemplateIdAction,
    getLocaleAction,
    setFormFlowAction,
    changeStepStatus,
    changeStageStatus,
    getInvoiceEvents,
    setInvoice
} from 'checkout/actions';

const mapStateToProps = (state: State) => ({
    config: state.config,
    model: state.model,
    error: state.error,
    formsFlow: state.formsFlow,
    initialization: state.lifecycle.initialization
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    getAppConfig: bindActionCreators(getAppConfigAction, dispatch),
    getLocaleConfig: bindActionCreators(getLocaleAction, dispatch),
    getInvoiceTemplate: bindActionCreators(getInvoiceTemplateAction, dispatch),
    setInvoice: bindActionCreators(setInvoice, dispatch),
    getInvoiceEvents: bindActionCreators(getInvoiceEvents, dispatch),
    getInvoicePaymentMethods: bindActionCreators(getInvoicePaymentMethodsAction, dispatch),
    getInvoicePaymentMethodsByTemplateId: bindActionCreators(getInvoicePaymentMethodsByTemplateIdAction, dispatch),
    setFormFlowAction: bindActionCreators(setFormFlowAction, dispatch),
    changeStepStatus: bindActionCreators(changeStepStatus, dispatch),
    changeStageStatus: bindActionCreators(changeStageStatus, dispatch)
});

class AppDef extends React.Component<AppProps> {

    constructor(props: AppProps) {
        super(props);
    }

    componentDidMount() {
        this.props.changeStageStatus('started');
    }

    componentWillReceiveProps(p: AppProps) {
        if (p.initialization.stageStatus === 'started') {
            manageInitStage(p);
        }
        if (p.initialization.stageStatus === 'ready') {
            p.setFormFlowAction(initFormsFlow(p.config.initConfig, p.model));
            p.changeStageStatus('processed');
        }
    }

    render() {
        const status = this.props.initialization.stageStatus;
        const error = this.props.error;
        return (
            <div className={styles.layout}>
                <Overlay/>
                {error ? <div>{error.message}</div> : false}
                {status === 'processed' ? <ModalContainer/> : false}
                {status === 'started' && !error ? <LayoutLoader/> : false}
            </div>
        );
    }
}

export const App = connect(mapStateToProps, mapDispatchToProps)(AppDef);
