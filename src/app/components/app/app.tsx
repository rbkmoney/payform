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
import {
    getAppConfigAction,
    getInvoiceTemplateAction,
    getInvoiceAction,
    getInvoicePaymentMethodsAction,
    getInvoicePaymentMethodsByTemplateIdAction,
    getLocaleAction,
    setFormFlowAction,
    changeStepStatus
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
    getInvoice: bindActionCreators(getInvoiceAction, dispatch),
    getInvoicePaymentMethods: bindActionCreators(getInvoicePaymentMethodsAction, dispatch),
    getInvoicePaymentMethodsByTemplateId: bindActionCreators(getInvoicePaymentMethodsByTemplateIdAction, dispatch),
    setFormFlowAction: bindActionCreators(setFormFlowAction, dispatch),
    changeStepStatus: bindActionCreators(changeStepStatus, dispatch)
});

class AppDef extends React.Component<AppProps> {

    constructor(props: AppProps) {
        super(props);
    }

    componentDidMount() {
        this.props.changeStepStatus('stageStart', true);
    }

    componentWillReceiveProps(props: AppProps) {
        if (!this.props.initialization.stageDone) {
            manageInitStage(props);
        }
    }

    render() {
        const initStageDone = this.props.initialization.stageDone;
        const error = this.props.error;
        return (
            <div className={styles.layout}>
                <Overlay/>
                {error ? <div>{error.message}</div> : false}
                {initStageDone ? <ModalContainer/> : false}
                {!initStageDone && !error ? <LayoutLoader/> : false}
            </div>
        );
    }
}

export const App = connect(mapStateToProps, mapDispatchToProps)(AppDef);
