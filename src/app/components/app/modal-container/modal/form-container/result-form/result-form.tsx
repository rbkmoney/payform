import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as cx from 'classnames';
import * as styles from './result-form.scss';
import { FormName, ModalForms, ModalName, ResultFormInfo, ResultState, ResultType, State } from 'checkout/state';
import { goToFormInfo, setResult } from 'checkout/actions';
import { ResultFormProps } from './result-form-props';
import { findNamed } from 'checkout/utils';
import { makeContentCustomer, makeContentError, makeContentInvoice, ResultFormContent } from './make-content';
import { ActionBlock } from './action-block';
import { IntegrationType } from 'checkout/config';
import { getErrorCodeFromEvents } from '../get-error-code-from-changes';
import { isHelpAvailable } from './is-help-available';
import { ErrorDescriptionBlock } from './error-description-block';

class ResultFormDef extends React.Component<ResultFormProps> {
    render() {
        const { header, description, icon, hasActions, hasDone } = this.makeContent();
        const { hasErrorDescription } = this.props;
        if (hasDone) {
            this.props.setResult(ResultState.done);
        }
        return (
            <form className={cx(styles.form, { [styles.form_withoutActions]: !hasActions })}>
                <div className={styles.container}>
                    <h2 className={styles.title}>{header}</h2>
                    {icon}
                    {description}
                    {hasErrorDescription ? <ErrorDescriptionBlock /> : false}
                    {hasActions ? <ActionBlock /> : false}
                </div>
            </form>
        );
    }

    private makeContent(): ResultFormContent {
        const { locale, model, error, resultFormInfo, integrationType } = this.props;
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
        hasErrorDescription: isHelpAvailable(
            getErrorCodeFromEvents(state.model, state.config.initConfig.integrationType)
        ),
        hasMultiMethods: !!findNamed(info, FormName.paymentMethods)
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setResult: bindActionCreators(setResult, dispatch),
    goToFormInfo: bindActionCreators(goToFormInfo, dispatch)
});

export const ResultForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(ResultFormDef);
