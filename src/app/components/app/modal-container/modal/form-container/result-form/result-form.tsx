import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as styles from './result-form.scss';
import { FormName, ModalForms, ModalName, State, ResultFormInfo, ResultState } from 'checkout/state';
import { prepareToRetry, setResult } from 'checkout/actions';
import { ResultFormProps } from './result-form-props';
import { findNamed } from 'checkout/utils';
import { makeContent } from './make-content';
import { ActionBlock } from './action-block';

const ResultFormDef: React.SFC<ResultFormProps> = (props) => {
    const {header, description, icon, hasActions, hasDone} = makeContent(
        props.resultFormInfo,
        props.locale,
        props.model.invoiceEvents,
        props.error
    );
    if (hasDone) {
        props.setResult(ResultState.done);
    }
    return (
        <form className={styles.form}>
            <h2 className={styles.title}>{header}</h2>
            {icon}
            {description ? description : false}
            {hasActions ? <ActionBlock {...props}/> : false}
        </form>
    );
};

const mapStateToProps = (state: State) => {
    const info = (findNamed(state.modals, ModalName.modalForms) as ModalForms).formsInfo;
    return {
        model: state.model,
        config: state.config,
        locale: state.config.locale,
        error: state.error ? state.error.error : null,
        resultFormInfo: findNamed(info, FormName.resultForm) as ResultFormInfo
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setResult: bindActionCreators(setResult, dispatch),
    prepareToRetry: bindActionCreators(prepareToRetry, dispatch)
});

export const ResultForm = connect(mapStateToProps, mapDispatchToProps)(ResultFormDef);
