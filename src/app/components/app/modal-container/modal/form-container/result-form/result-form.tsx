import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import * as styles from './result-form.scss';
import { connect } from 'react-redux';
import { FormName, ModalForms, ModalName, ModalState, State, ResultType } from 'checkout/state';
import { prepareToRetry, setResult } from 'checkout/actions';
import { ResultFormProps } from './result-form-props';
import { FormBlock } from './form-block';
import { findNamed } from 'checkout/utils';

const ResultFormDef: React.SFC<ResultFormProps> = (props) => {
    const {resultType} = props.resultFormInfo;
    return (
        <div>
            {resultType === ResultType.indefinite ? <div className={styles.loadingSubstrate}/> : false}
            {resultType !== ResultType.indefinite ? <FormBlock {...props}/> : false}
        </div>
    );
};

const toResultFormInfo = (modals: ModalState[]) => {
    const info = (findNamed(modals, ModalName.modalForms) as ModalForms).formsInfo;
    return findNamed(info, FormName.resultForm);
};

const mapStateToProps = (state: State) => ({
    model: state.model,
    config: state.config,
    locale: state.config.locale,
    resultFormInfo: toResultFormInfo(state.modals),
    error: state.error ? state.error.error : null
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setResult: bindActionCreators(setResult, dispatch),
    prepareToRetry: bindActionCreators(prepareToRetry, dispatch)
});

export const ResultForm = connect(mapStateToProps, mapDispatchToProps)(ResultFormDef);
