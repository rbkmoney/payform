import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as styles from './layout.scss';
import { Overlay } from './overlay';
import { ModalContainer } from './modal-container';
import { LayoutLoader } from './layout-loader';
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
import { StageStatus } from 'checkout/lifecycle';

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

    stageName = 'initialization';

    constructor(props: AppProps) {
        super(props);
    }

    componentDidMount() {
        this.props.changeStageStatus(this.stageName, StageStatus.started);
    }

    componentWillReceiveProps(p: AppProps) {
        if (p.initialization.stageStatus === StageStatus.started) {
            manageInitStage(p);
        }
        if (p.initialization.stageStatus === 'ready') {
            p.setFormFlowAction(initFormsFlow(p.config.initConfig, p.model));
            p.changeStageStatus(this.stageName, StageStatus.processed);
        }
    }

    render() {
        const status = this.props.initialization.stageStatus;
        const error = this.props.error;
        return (
            <div className={styles.layout}>
                <Overlay/>
                {error ? <div>{error.message}</div> : false}
                {status === StageStatus.processed ? <ModalContainer/> : false}
                {status === StageStatus.started && !error ? <LayoutLoader/> : false}
            </div>
        );
    }
}

export const App = connect(mapStateToProps, mapDispatchToProps)(AppDef);
