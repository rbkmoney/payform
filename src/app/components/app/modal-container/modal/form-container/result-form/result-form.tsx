import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as cx from 'classnames';
import * as styles from './result-form.scss';
import { FormName, ModalForms, ModalName, ResultFormInfo, ResultState, ResultType, State } from 'checkout/state';
import { goToFormInfo, setResult } from 'checkout/actions';
import { ResultFormProps } from './result-form-props';
import { findNamed } from 'checkout/utils';
import {
    makeContentCustomer,
    makeContentError,
    makeContentInvoice,
    ResultFormContent,
    ResultFormType
} from './make-content';
import { ActionBlock } from './action-block';
import { IntegrationType } from 'checkout/config';
import { getErrorCodeFromEvents } from '../get-error-code-from-changes';
import { isHelpAvailable } from './is-help-available';
import { ErrorDescriptionBlock } from './error-description-block';
import { ResultIcon } from 'checkout/components/app/modal-container/modal/form-container/result-form/result-icons';

class ResultFormDef extends React.Component<ResultFormProps> {
    render() {
        const { header, description, type, hasActions, hasDone } = this.makeContent();
        const { hasErrorDescription } = this.props;
        if (hasDone) {
            this.props.setResult(ResultState.done);
        }
        return (
            <form className={cx(styles.form, { [styles.form_withoutActions]: !hasActions })}>
                <div className={styles.container}>
                    <h2 className={cx(styles.title, { [styles.title_error]: type === ResultFormType.ERROR })}>
                        {header}
                    </h2>
                    <ResultIcon type={type} />
                    {description}
                    {hasErrorDescription ? <ErrorDescriptionBlock /> : false}
                    {hasActions ? <ActionBlock /> : false}
                </div>
            </form>
        );
    }

    private makeContent(): ResultFormContent {
        const { locale, events, error, resultFormInfo, integrationType } = this.props;
        switch (resultFormInfo.resultType) {
            case ResultType.error:
                return makeContentError(locale, error);
            case ResultType.processed:
                switch (integrationType) {
                    case IntegrationType.invoice:
                    case IntegrationType.invoiceTemplate:
                        return makeContentInvoice(locale, events.events, events.status);
                    case IntegrationType.customer:
                        return makeContentCustomer(locale, events.events, events.status);
                }
        }
    }
}

const mapStateToProps = (state: State) => {
    const info = (findNamed(state.modals, ModalName.modalForms) as ModalForms).formsInfo;
    return {
        events: state.events,
        integrationType: state.config.initConfig.integrationType,
        locale: state.config.locale,
        error: state.error ? state.error.error : null,
        resultFormInfo: findNamed(info, FormName.resultForm) as ResultFormInfo,
        hasErrorDescription: isHelpAvailable(
            getErrorCodeFromEvents(state.events, state.config.initConfig.integrationType)
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
