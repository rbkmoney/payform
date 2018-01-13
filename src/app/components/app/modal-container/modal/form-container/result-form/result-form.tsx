import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import * as styles from './result-form.scss';
import { connect } from 'react-redux';
import { ModalForms, State } from 'checkout/state';
import { setResult } from 'checkout/actions';
import { ResultFormProps } from './result-form-props';
import { FormBlock } from './form-block';
import { ResultType } from 'checkout/state/modal/form-info/result-form-info';

const ResultFormDef: React.SFC<ResultFormProps> = (props) => {
    const {resultType} = props.formInfo;
    return (
        <div>
            {resultType === ResultType.indefinite ? <div className={styles.loadingSubstrate}/> : false}
            {resultType !== ResultType.indefinite ? <FormBlock {...props}/> : false}
        </div>
    );
};

const mapStateToProps = (state: State) => ({
    model: state.model,
    locale: state.config.locale,
    formInfo: (state.modal as ModalForms).formInfo,
    error: state.error ? state.error.error : null
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setResult: bindActionCreators(setResult, dispatch)
});

export const ResultForm = connect(mapStateToProps, mapDispatchToProps)(ResultFormDef);
