import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as styles from './result-form.scss';
import { FormName, ModalForms, ModalName, State, ResultFormInfo, ResultState, ResultType } from 'checkout/state';
import { setResult, setViewInfoHeight } from 'checkout/actions';
import { ResultFormProps } from './result-form-props';
import { findNamed } from 'checkout/utils';
import { makeContentInvoice, ResultFormContent, makeContentError, makeContentCustomer } from './make-content';
import { ActionBlock } from './action-block';
import { IntegrationType } from 'checkout/config';

class ResultFormDef extends React.Component<ResultFormProps> {

    componentDidMount() {
        this.setHeight();
    }

    render() {
        const {header, description, icon, hasActions, hasDone} = this.makeContent();
        if (hasDone) {
            this.props.setResult(ResultState.done);
        }
        return (
            <form className={styles.form}>
                <div>
                    <h2 className={styles.title}>{header}</h2>
                    {icon}
                    {description ? description : false}
                    {hasActions ? <ActionBlock/> : false}
                </div>
            </form>
        );
    }

    private setHeight() {
        this.props.hasMultiMethods
            ? this.props.setViewInfoHeight(425)
            : this.props.setViewInfoHeight(392);
    }

    private makeContent(): ResultFormContent {
        const {locale, model, error, resultFormInfo, integrationType} = this.props;
        switch (resultFormInfo.resultType) {
            case ResultType.error:
                return makeContentError(locale, error);
            case ResultType.processed:
                switch (integrationType) {
                    case IntegrationType.invoice:
                    case IntegrationType.invoiceTemplate:
                        return makeContentInvoice(locale, model.invoiceEvents);
                    case IntegrationType.customer:
                        return makeContentCustomer(locale, model.customerEvents);
                }
        }
    }
}

const mapStateToProps = (state: State) => {
    const info = (findNamed(state.modals, ModalName.modalForms) as ModalForms).formsInfo;
    return {
        model: state.model,
        integrationType: state.config.initConfig.integrationType,
        locale: state.config.locale,
        error: state.error ? state.error.error : null,
        resultFormInfo: findNamed(info, FormName.resultForm) as ResultFormInfo,
        hasMultiMethods: !!findNamed(info, FormName.paymentMethods)
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setResult: bindActionCreators(setResult, dispatch),
    setViewInfoHeight: bindActionCreators(setViewInfoHeight, dispatch)
});

export const ResultForm = connect(mapStateToProps, mapDispatchToProps)(ResultFormDef);
