import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import * as styles from './result-form.scss';
import { connect } from 'react-redux';
import {
    FormName, ModalForms, ModalName, ModalState, State,
    ResultType, PaymentStatus, ResultFormInfo
} from 'checkout/state';
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

interface FormInfoChunk {
    resultFormInfo: ResultFormInfo;
    isPaymentStarted: boolean;
}

const toFormInfoChunk = (modals: ModalState[]): FormInfoChunk => {
    const info = (findNamed(modals, ModalName.modalForms) as ModalForms).formsInfo;
    return {
        resultFormInfo: findNamed(info, FormName.resultForm) as ResultFormInfo,
        isPaymentStarted: !!info.find((item) => item.paymentStatus === PaymentStatus.started)
    };
};

const mapStateToProps = (state: State) => ({
    model: state.model,
    config: state.config,
    locale: state.config.locale,
    error: state.error ? state.error.error : null,
    ...toFormInfoChunk(state.modals)
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setResult: bindActionCreators(setResult, dispatch),
    prepareToRetry: bindActionCreators(prepareToRetry, dispatch)
});

export const ResultForm = connect(mapStateToProps, mapDispatchToProps)(ResultFormDef);
